"""Bounded reads of the Cosmoot collector's published Juno observations."""
from datetime import datetime, timezone
import json
import re
from urllib.request import Request, urlopen

ORIGIN = 'https://data.cosmoot.com/data/'
CORE = 'juno1c5v6jkmre5xa9vf9aas6yxewc7aqmjy0rlkkyk4d88pnwuhclyhsrhhns6'
VOTING = 'juno1839rlmw33avduccuhpnv6cqxsdlwpz87vq8g6x6jkfrdzpwtl8nsgf20f4'


def fetch(path):
    url = ORIGIN + path
    with urlopen(Request(url, headers={'Accept': 'application/json'}), timeout=10) as response:
        data = response.read(2_000_001)
        if response.geturl() != url or len(data) > 2_000_000:
            raise ValueError('Unexpected shared data response')
        return json.loads(data)


def recent(value, minutes):
    stamp = datetime.fromisoformat(value.replace('Z', '+00:00'))
    if stamp.tzinfo is None or not -60 <= (datetime.now(timezone.utc) - stamp).total_seconds() <= minutes * 60:
        raise ValueError('Stale shared observation')


def stakes(value, token, staking):
    if (value['chain_id'], value['core'], value['voting_module'], value['staking_contract'], value['token_contract']) != (
            'juno-1', CORE, VOTING, staking, token):
        raise ValueError('Shared staking identity mismatch')
    recent(value['generated_at'], 65)
    if value['members_complete'] is not True or type(value['height']) is not int or value['height'] < 1:
        raise ValueError('Incomplete shared stake snapshot')
    positions = {}
    for member in value['members']:
        address, raw = member['address'], member['power_raw']
        if (not re.fullmatch(r'juno1[023456789acdefghjklmnpqrstuvwxyz]{38,58}', address) or address in positions
                or not re.fullmatch(r'[1-9][0-9]{0,38}', raw)):
            raise ValueError('Invalid shared stake')
        positions[address] = int(raw)
    if not positions or sum(positions.values()) != int(value['total_power_raw']):
        raise ValueError('Shared voting power does not reconcile')
    return positions
