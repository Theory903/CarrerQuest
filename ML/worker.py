import pika
import json
from prediction import run_prediction  # Import your ML model logic

def callback(ch, method, properties, body):
    print(" [x] Received %r" % body)

    data = json.loads(body)

    # Perform the ML prediction
    result = run_prediction(data)
    print("Processed result: ", result)

    # Acknowledge message processing
    ch.basic_ack(delivery_tag=method.delivery_tag)

# Connect to RabbitMQ
connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

# Declare the queue
channel.queue_declare(queue='task_queue', durable=True)

# Tell RabbitMQ this worker is ready to process messages
channel.basic_qos(prefetch_count=1)
channel.basic_consume(queue='task_queue', on_message_callback=callback)

print(' [*] Waiting for messages. To exit, press CTRL+C')
channel.start_consuming()
