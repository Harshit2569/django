Minimal Django app that uses SQLite. Click the "Add item" button to create items.

Quick start:

1. Create a virtual environment and activate it.
2. Install dependencies:

```
pip install -r requirements.txt
```

3. Run migrations and start the server:

```
python manage.py migrate
python manage.py runserver
```

CI/CD:

This project includes a GitHub Actions workflow at `.github/workflows/ci-cd.yml`.

On pull requests and pushes to `main` or `master`, it installs dependencies, checks
migrations, runs Django system checks, and runs tests.

On pushes to `main` or `master`, it deploys over SSH after CI passes. Configure
these GitHub repository secrets before enabling production deployment:

- `SSH_HOST`
- `SSH_USER`
- `SSH_PRIVATE_KEY`
- `DEPLOY_PATH` (directory on the server that contains this repository)
- `DJANGO_SECRET_KEY`
- `DJANGO_DEBUG` (set to `False` for production)
- `DJANGO_ALLOWED_HOSTS` (for example, `your-domain.com,www.your-domain.com`)

If your systemd service is not named `mysite`, update the final deploy command in
`.github/workflows/ci-cd.yml`.
