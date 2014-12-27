# WIP: this is a work in progress, no test were executed.
# TODO: Django GIS needs special configuration to create the test db.
from django.core.urlresolvers import reverse
from django.test import TestCase

class ClientAreaTest(TestCase):

    def test_draw_view(self):
        response = self.client.get(reverse('draw'))
        self.assertEqual(response.status, 200)

    def test_draw_view(self):
        response = self.client.get(reverse('find'))
        self.assertEqual(response.status, 200)