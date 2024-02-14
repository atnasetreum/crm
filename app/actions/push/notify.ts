"use server";

import * as webpush from "web-push";

import prisma from "@config/database";
import vapidKeys from "@config/vapid-keys.json";
import { auth } from "@app/auth.config";

webpush.setVapidDetails(
  "mailto:eduardo-266@hotmail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

export const notify = async (payload: {
  clientId: number;
  name: string;
  projectName: string;
  type: string;
  comment: string;
  date: string;
}) => {
  try {
    const session = await auth();

    if (!session?.user) {
      return {
        ok: false,
        message: "Unauthorized",
      };
    }

    const clientsWithSubscription = await prisma.user.findMany({
      where: {
        subscriptions: {
          some: {
            createdById: session.user.id,
          },
        },
      },
      include: {
        subscriptions: true,
      },
    });

    for (let i = 0, t = clientsWithSubscription.length; i < t; i++) {
      const { subscriptions, email } = clientsWithSubscription[i];

      for (let i2 = 0, t2 = subscriptions.length; i2 < t2; i2++) {
        const data = subscriptions[i2];

        const subscription = JSON.parse(data.subscription);

        webpush
          .sendNotification(subscription, JSON.stringify(payload))
          .then(() => {
            console.log(`Notification sent, user: ${email}`);
          })
          .catch(async (error) => {
            console.log(`Error sending notification, user: ${email}`, error);
            if (error.statusCode === 410) {
              await prisma.subscription.delete({
                where: {
                  id: data.id,
                },
              });
            }
          });
      }
    }

    return {
      ok: true,
      message: "ok",
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error al recuperar el cliente",
    };
  }
};
