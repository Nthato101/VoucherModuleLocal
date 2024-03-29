# Generated by Django 4.2.10 on 2024-02-24 11:36

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Voucher',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=45)),
                ('email', models.EmailField(max_length=254)),
                ('redemptions', models.IntegerField(default=0)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('expires_at', models.DateTimeField(null=True)),
                ('pin', models.CharField(max_length=4)),
                ('status', models.CharField(
                    choices=[('created', 'Not Used'), ('expired', 'Expired'), ('partial_used', 'Partially Redeemed'),
                             ('used', 'Used')], default='created', max_length=50)),
            ],
        ),
    ]
