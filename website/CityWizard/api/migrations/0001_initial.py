# Generated by Django 3.1.4 on 2021-08-07 12:10

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('email', models.CharField(blank=True, max_length=100, null=True)),
                ('password', models.CharField(blank=True, max_length=50, null=True)),
                ('previous_searches', models.CharField(blank=True, max_length=1000, null=True)),
                ('saved_cities', models.CharField(blank=True, max_length=1000, null=True)),
            ],
        ),
    ]
