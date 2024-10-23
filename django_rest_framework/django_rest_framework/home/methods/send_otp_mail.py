from django.core.mail import EmailMultiAlternatives
from django.template.loader import get_template
from django.template import Context
from django.conf import settings
import random

def generate_otp():
    otp = random.randint(100000, 999999)
    return str(otp)

def SendMail(recipient):
    html_template = get_template('otp.html')
    otp = generate_otp()
    context = {'otp':otp}
    html_content = html_template.render(context)
    email_message = EmailMultiAlternatives('Password reset Otp','',settings.EMAIL_HOST_USER,[recipient])
    email_message.attach_alternative(html_content, "text/html")
    email_message.send()
    return otp