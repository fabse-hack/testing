import os
import subprocess
import requests

commit_sha = subprocess.check_output(['git', 'rev-parse', 'HEAD']).decode().strip()
discord_webhook = os.environ.get('DISCORD_WEBHOOK')

commit_message = subprocess.check_output(['git', 'log', '--format=%B', '-n', '1', commit_sha]).decode().strip()
commit_author = subprocess.check_output(['git', 'log', '--format=%an', '-n', '1', commit_sha]).decode().strip()

message = f'New commit by {commit_author} ({commit_sha[:7]}):\n{commit_message}'

payload = {
    'content': message
}

requests.post(discord_webhook, json=payload)
