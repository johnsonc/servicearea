# WIP: this is a work in progress, no test were executed.
# TODO: Django GIS needs special configuration to create the test db.
from django.core.urlresolvers import reverse
from django.test import TestCase
from areas.models import Area

class AreasTest(TestCase):

    def test_area_creation(self):
        data = { 'name': 'area1', 'mpoly': self.get_area() }
        response = self.client.post(reverse('area-list'), data)
        self.assertEqual(response.status, 201)

    def test_area_filter(self):
        data = { 'name': 'area1', 'mpoly': self.get_area() }
        response = self.client.post(reverse('area-list', data))
        self.client.get('%s?lat=%s&lng=%s' % (reverse('area-list'), 113.49906921386719, 22.570902079599385))
        self.assertEqual(response.status, 200)

    def get_area(self):
        data = {
            "type": "MultiPolygon",
            "coordinates":
                [
                    [
                        [
                            [
                                113.49906921386719,
                                22.570902079599385
                            ],
                            [
                                113.43315124511719,
                                22.584850519363435
                            ],
                            [
                                113.32603454589844,
                                22.589922329157808
                            ],
                            [
                                113.33427429199219,
                                22.480837310735552
                            ],
                            [
                                113.37821960449219,
                                22.470685489374304
                            ],
                            [
                                113.49357604980469,
                                22.525242774383898
                            ],
                            [
                                113.53202819824219,
                                22.554415740003208
                            ],
                            [
                                113.49906921386719,
                                22.570902079599385
                            ]
                        ]
                    ]
                ]
            },
            "properties": {
                "name": "Zhonghan",
                "created": "2014-12-27T11:39:31.376Z",
                "user": null
            }
        return data