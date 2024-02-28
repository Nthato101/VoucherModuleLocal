from datetime import datetime
import json
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Voucher
from .serializers import VoucherSerializer


# Create your views here.
@api_view(['POST'])
def createvoucher(request):
    if request.method == 'POST':
        data = request.body.decode().strip()
        data_json = json.loads(data)
        voucher_serializer = VoucherSerializer(data=data_json, many=False)
        vouchers = Voucher.objects.all()
        voucher_pins = [voucher.pin for voucher in vouchers]
        if voucher_serializer.initial_data['pin'] not in voucher_pins:
            if voucher_serializer.is_valid():
                voucher_serializer.save()
                return Response(f"Voucher Added Successfully with: "
                                f"Pin: {voucher_serializer.data['pin']}!"
                                f"Exiry date: {voucher_serializer.data['expires_at']} "
                                f"Redemptions: {voucher_serializer.data['redemptions']}")

            else:
                return Response('Failed to add Voucher!')

        else:
            return Response('Pin Already Exists!, Please Try Another 4 digit Pin Number!')


# Voucher List View using serializer sets expired pins to Null so pins may be reused
@api_view(['GET'])
def get_vouchers(request):
    if request.method == 'GET':
        vouchers = Voucher.objects.all()
        for voucher in vouchers:
            if voucher.expires_at < datetime.now().date():
                voucher.status = 'Expired'
                voucher.redemptions = 0
                voucher.pin = None
                voucher.save()
            elif voucher.redemptions <=0 :
                voucher.status = 'Used'
                voucher.pin = None
            if voucher.expires_at > datetime.now().date() and voucher.redemptions <= 0:
                voucher.status = 'Used'
                voucher.pin = None
                voucher.save()
        serializer = VoucherSerializer(vouchers, many=True)
        return Response(serializer.data)



# Vocuher Redeem Method passing parameter into URI
@api_view(['POST'])
def redeemvoucher(request):
    if request.method == 'POST':
        data = request.body.decode().strip()
        data_json = json.loads(data)
        print(data_json)
        try:
            voucher = Voucher.objects.get(pin=str(data_json['pin']))
        except Voucher.DoesNotExist:
            return Response('Voucher was not found, please check that that you have entered the correct pin.')
        else:
            if voucher:
                day = datetime.now().date()
                if voucher.redemptions > 0 and voucher.expires_at >= day and voucher.status != 'Used':
                    voucher.redemptions -= 1
                    voucher.save()
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

                else:
                    return Response('Voucher has already been redeemed or Voucher has expired! ')
