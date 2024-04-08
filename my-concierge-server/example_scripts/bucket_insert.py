import boto3

def get_public_url(bucket_name, object_key):
    # Construct the public URL based on the S3 bucket's endpoint and object key
    return f'https://{bucket_name}.s3.amazonaws.com/{object_key}'

s3 = boto3.resource('s3')

bucket_name = 'my-concierge-bucket'

object_key = 'test-images/cava.jpg'

s3.meta.client.upload_file(
    '/mnt/c/Users/arpsk/Downloads/cava.jpg', # where the file is stored locally on my machine
    bucket_name,
    object_key,
    ExtraArgs={'ACL': 'public-read'}
)

public_url = get_public_url(bucket_name, object_key)

print(f'The publicly accessible URL for the object is: {public_url}')
