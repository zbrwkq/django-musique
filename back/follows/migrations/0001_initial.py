# Generated by Django 5.0.6 on 2024-06-11 14:28

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Follows',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('id_user', models.IntegerField(default=0)),
                ('id_follow', models.IntegerField(default=0)),
            ],
        ),
    ]
