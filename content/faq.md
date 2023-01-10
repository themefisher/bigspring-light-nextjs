---
title: Frequently Asked Questions
layout: faq
draft: false
faqs:
- title: How do I get started / is there any documentation and support? 
  answer: Go to our [Github](https://github.com/oslabs-beta/Docker-Storm) and refer to the [README](https://github.com/oslabs-beta/Docker-Storm/blob/main/README.md) for start up instructions. If you have questions on how to set up your own Docker Swarm using Multipass, please follow this [README](https://github.com/oslabs-beta/Docker-Storm#prerequisites) link. All you will need to do is enter your PG URI into the .env file, and the rest of the setup will be done when you start the app for the first time and sign up for an account!

- title: How does Docker Storm help developers?
  answer: Docker Storm helps developers keep track of the most important metrics of their Docker Swarms without needing to set up or have any knowledge on how to configure Grafana. All that needs to be done is input the Grafana API key and every metric on every node you care about will be dynamically created.

- title: Why should I use Docker Swarms over Kubernetes?
  answer: While Kubernetes is a fantastic tool, it is very difficult to use, and might have too many features that a smaller developer just doesn't need. Docker Swarms are a great, lightweight, and easier to use container orchestration system. If you don't need all the benefits of Kubernetes, Docker Swarms are something to consider! 

- title: What are the downsides to Docker Swarms?
  answer: Unlike Kubernetes, Docker Swarms require use of third party tools like Grafana and Prometheus to keep track of important metrics. This is where Docker Storm comes in and takes care of the metrics for the developer, so they can focus on development and not have to worry about how to use several separate third party tools!  

- title: How do I reach the team with questions or bug fixes?
  answer: Please visit our [Meet the Team](/contact) page and you will find all the relevant links to contact us. We look forward to hearing from you!
---
