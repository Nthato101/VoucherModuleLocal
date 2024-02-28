from django.urls import path
from .views import get_vouchers, createvoucher, redeemvoucher

urlpatterns = [
    path('voucherlist/', get_vouchers, name='voucher_list'),
    path('mkevoucher/', createvoucher, name='create_voucher'),
    path('redeemvoucher/', redeemvoucher, name='redeem_voucher')
]
