import { publishToQueue, connectRabbitMQ } from './config.js';

// Queue names
const QUEUES = {
  AI_TASKS: 'ai_tasks',
  REPORT_TASKS: 'report_tasks',
  GENERAL: 'careerquest_tasks'
};

// Send AI chat task to queue
export const sendAITask = async (task) => {
  return await publishToQueue(QUEUES.AI_TASKS, {
    type: 'ai_chat',
    timestamp: new Date().toISOString(),
    data: task
  });
};

// Send report generation task to queue
export const sendReportTask = async (task) => {
  return await publishToQueue(QUEUES.REPORT_TASKS, {
    type: 'report_generation',
    timestamp: new Date().toISOString(),
    data: task
  });
};

// Send general task to queue
export const sendTask = async (taskType, data) => {
  return await publishToQueue(QUEUES.GENERAL, {
    type: taskType,
    timestamp: new Date().toISOString(),
    data
  });
};

// Initialize producer connection
export const initProducer = async () => {
  try {
    await connectRabbitMQ();
    console.log('📤 RabbitMQ producer initialized');
    return true;
  } catch (error) {
    console.log('⚠️ Running without RabbitMQ - tasks will be processed synchronously');
    return false;
  }
};

export default {
  sendAITask,
  sendReportTask,
  sendTask,
  initProducer,
  QUEUES
};
