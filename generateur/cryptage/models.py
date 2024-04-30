from django.db import models


# Create your models here.
class Departement(models.Model):
    nom_depart = models.CharField(max_length = 64)
    
    def __str__(self):
        return self.nom_depart

class Membres(models.Model):
    nom = models.CharField(max_length = 32)
    prenom = models.CharField(max_length = 32)
    departement = models.ForeignKey(Departement, on_delete = models.CASCADE)
    telephone = models.CharField(max_length = 9)
    email = models.EmailField(unique = True)
    profession = models.CharField(max_length = 32)
    
    def __str__(self):
        return f"{self.nom} {self.prenom}"

class Stock(models.Model):
    membre = models.ForeignKey(Membres, on_delete = models.CASCADE)
    image=models.ImageField(upload_to='images')
    date_generation=models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-date_generation']






