import boto3

s3 = boto3.resource('s3')

# Specify the bucket and object key (path to the file) you want to delete
bucket_name = 'my-concierge-bucket'
object_key = 'test-images/pizza_hut.jpg'

# Delete the object
s3.Object(bucket_name, object_key).delete()

print(f'The object with key "{object_key}" has been deleted from the bucket "{bucket_name}".')
