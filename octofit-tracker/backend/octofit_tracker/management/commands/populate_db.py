from django.core.management.base import BaseCommand
from octofit_tracker.models import Team, User, Workout, Activity, Leaderboard
from django.utils import timezone

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Clear existing data
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()
        Workout.objects.all().delete()

        # Teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Users
        users = [
            User.objects.create(name='Iron Man', email='ironman@marvel.com', team=marvel),
            User.objects.create(name='Captain America', email='cap@marvel.com', team=marvel),
            User.objects.create(name='Spider-Man', email='spiderman@marvel.com', team=marvel),
            User.objects.create(name='Batman', email='batman@dc.com', team=dc),
            User.objects.create(name='Wonder Woman', email='wonderwoman@dc.com', team=dc),
            User.objects.create(name='Superman', email='superman@dc.com', team=dc),
        ]

        # Workouts
        workouts = [
            Workout.objects.create(name='Pushups', description='Upper body workout'),
            Workout.objects.create(name='Running', description='Cardio workout'),
            Workout.objects.create(name='Squats', description='Lower body workout'),
        ]

        # Activities
        today = timezone.now().date()
        Activity.objects.create(user=users[0], workout=workouts[0], date=today, duration=30, points=50)
        Activity.objects.create(user=users[1], workout=workouts[1], date=today, duration=45, points=70)
        Activity.objects.create(user=users[2], workout=workouts[2], date=today, duration=20, points=30)
        Activity.objects.create(user=users[3], workout=workouts[0], date=today, duration=25, points=40)
        Activity.objects.create(user=users[4], workout=workouts[1], date=today, duration=35, points=60)
        Activity.objects.create(user=users[5], workout=workouts[2], date=today, duration=50, points=90)

        # Leaderboard
        Leaderboard.objects.create(team=marvel, total_points=150)
        Leaderboard.objects.create(team=dc, total_points=190)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
