from django.http import JsonResponse
from django.shortcuts import render
import qrcode
import random as rd
from PIL import Image
import os
from io import BytesIO
from django.contrib import messages

from cryptage.models import Departement, Stock,Membres
from django.core.files.base import ContentFile


def home(request):
    departement = Departement.objects.all()
    image_afficher=Stock.objects.first()
    context={
            'img':image_afficher,
            'departement':departement
            
        }
    error = False
    if request.method=='POST':
        id_dep = request.POST.get('departement')
        prenom=request.POST.get('prenom')
        nom=request.POST.get('nom')
        email=request.POST.get('email')
        telephone=request.POST.get('telephone')
        profession=request.POST.get('profession')
        departement =Departement.objects.get(id = id_dep)
        
        exist_membre = Membres.objects.filter(email = email).exists()
        
        if exist_membre:
            error = True
            messages.error(request,"ce membre existe déja ou (email ou telephone) ont étés répeter!")
        else:
            error = False
            membre_cjp =Membres.objects.create(nom = nom,prenom = prenom,
                                        departement = departement,email = email,
                                        telephone = telephone,
                                        profession = profession)
            membre_cjp.save()
            table = Stock()
            table.membre=(membre_cjp)
            qr=qrcode.QRCode()
            data=f"***CLUB DES JEUNES PROGRAMMEURS***\nNom: {nom}\nPrénom: {prenom}\nDépartement: {departement}\nEmail: {email}\nTéléphone: {telephone}\nProfession: {profession}\nhttps://club-jp.com"
            qr.add_data(data)
            qr.make()
            img=qr.make_image(fill_color="black",back_color='white')
            binaire=BytesIO()
            logo = Image.open('static/images/log7.png').convert('RGBA')
            logo = logo.resize((150,150))
            logo_width, logo_height = logo.size
            qr_width, qr_height= img.size
            position = ((qr_width- logo_width)// 2,(qr_height - logo_height)//2)
            img.paste(logo,position)
            img.save(binaire,format='PNG')
            binaire.seek(0)
            table.image.save(f"{prenom}_{nom}_{departement}{rd.randint(1,1000)}.png", ContentFile(binaire.read()))
            table.save()
            messages.success(request,"le QR_CODE est génerer avec succès !!")
  
        error_messages = messages.get_messages(request)
        context['error_messages'] = error_messages
        context['error']= error
        print(error_messages)
        
        return render(request, 'cryptage/index.html',context)
        
    return render(request,'cryptage/index.html',context)



def list(request):

    images=Stock.objects.all()

    return render(request,'cryptage/list.html',{'images':images})