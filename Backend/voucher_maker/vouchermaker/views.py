from datetime import datetime
import json
from urllib import request

from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Voucher
from .serializers import VoucherSerializer


# Create your views here.

# Voucher Creation Method using API View Library
class createvoucher(generics.CreateAPIView):
    serializer_class = VoucherSerializer

    def get_queryset(self):
        queryset = Voucher.objects.all()
        return queryset.get(user=self.request.user)


# Voucher List View using serializer
@api_view(['GET'])
def get_vouchers(request):
    if request.method == 'GET':
        vouchers = Voucher.objects.all()
        for voucher in vouchers:
            if voucher.expires_at < datetime.now().date():
                voucher.status = 'Expired'
                voucher.redemptions = 0
                voucher.save()
            if voucher.expires_at > datetime.now().date() and voucher.redemptions <= 0:
                voucher.status = 'Used'
                voucher.save()
        serializer = VoucherSerializer(vouchers, many=True)
        return Response(serializer.data)


# For future use
# @api_view(['PATCH'])
# def updatevoucher(request,pk):
#     if request.method == 'PATCH':
#         data = request.body.decode().strip()
#         data_json = json.loads(data)
#         voucher = Voucher.objects.get(id=pk)
#         serializer = VoucherSerializer(voucher,data=data_json)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         else:
#             return Response('Failed to Update')

# @api_view(['DELETE'])
# def deletevoucher(request,pk):
#     if request.method == 'DELETE':
#         voucher = Voucher.objects.get(id=pk)
#         voucher.delete()
#         return Response('Voucher Deleted Successfully')


# Vocuher Redeem Method passing parameter into URI
@api_view(['POST'])
def redeemvoucher(request, pin):
    if request.method == 'POST':
        try:
            voucher = Voucher.objects.get(pin=str(pin))
        except Voucher.DoesNotExist:
            return Response('Voucher was not found, please check that that you have entered the correct pin.')
        else:
            if voucher:
                day = datetime.now().date()
                if voucher.redemptions > 0 and voucher.expires_at > day and voucher.status != 'Used':
                    voucher.redemptions -= 1
                    if voucher.redemptions == 0:
                        voucher.status = 'Used'
                        voucher.save()
                        return Response('Voucher Redeemed Successfully')
                    else:
                        voucher.status = 'Partially Used'
                        voucher.save()
                        if voucher.redemptions > 1:
                            return Response(f'Voucher Redeemed Successfully. You may redeem again '
                                            f'{voucher.redemptions} more times')
                        else:
                            return Response(
                                f'Voucher Redeemed Successfully. You may redeem again {voucher.redemptions} more time')

                elif voucher.expires_at < day:
                    return Response('Voucher has expired')
                elif voucher.redemptions <= 0:
                    voucher.status = 'Used'
                    voucher.save()
                    return Response('Voucher has already been redeemed completely!')
