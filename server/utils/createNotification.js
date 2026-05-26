import Notification from '../models/Notification.js';

export const createNotification = async ({
  recipients,
  sender,
  type,
  message,
  group,
  io,
}) => {
  try {
    // Create notification for each recipient
    const notifications = await Promise.all(
      recipients.map((recipientId) =>
        Notification.create({
          recipient: recipientId,
          sender,
          type,
          message,
          group,
        })
      )
    );

    // Send real-time notification via Socket.io
    if (io) {
      notifications.forEach((notif) => {
        io.to(notif.recipient.toString()).emit('notification', {
          _id: notif._id,
          message: notif.message,
          type: notif.type,
          isRead: false,
          createdAt: notif.createdAt,
        });
      });
    }

    return notifications;
  } catch (err) {
    console.error('Notification error:', err);
  }
};