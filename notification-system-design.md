# Notification System Design
# Stage 1

# Notification System Design

## Overview

The Notification Service is responsible for delivering notifications to authenticated users. It supports fetching notifications, marking them as read/unread, deleting notifications, retrieving unread counts, and receiving real-time notifications.

**Base URL**

```
/api/v1
```

---

# Notification Object

```json
{
  "id": "notif_12345",
  "userId": "user_1001",
  "title": "New Message",
  "message": "John sent you a message.",
  "type": "MESSAGE",
  "priority": "MEDIUM",
  "isRead": false,
  "createdAt": "2026-06-26T08:30:00Z",
  "updatedAt": "2026-06-26T08:30:00Z",
  "metadata": {
    "senderId": "user_2002",
    "conversationId": "conv_500"
  }
}
```

---

# Supported Notification Types

- MESSAGE
- SYSTEM
- ALERT
- ORDER
- PAYMENT
- PROMOTION
- REMINDER
- SOCIAL

---

# Core REST APIs

## 1. Get All Notifications

### Endpoint

```
GET /notifications
```

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| page | integer | Default 1 |
| limit | integer | Default 20 |
| isRead | boolean | Optional |
| type | string | Optional |
| sort | string | asc / desc |

### Response

```json
{
  "success": true,
  "page": 1,
  "limit": 20,
  "total": 56,
  "notifications": [
    {
      "id": "notif_123",
      "title": "Order Delivered",
      "message": "Your order has been delivered.",
      "type": "ORDER",
      "priority": "HIGH",
      "isRead": false,
      "createdAt": "2026-06-26T10:30:00Z"
    }
  ]
}
```

---

## 2. Get Notification By ID

### Endpoint

```
GET /notifications/{notificationId}
```

### Response

```json
{
  "success": true,
  "notification": {
    "id": "notif_123",
    "title": "New Message",
    "message": "John sent a message.",
    "type": "MESSAGE",
    "priority": "MEDIUM",
    "isRead": false,
    "createdAt": "2026-06-26T10:20:00Z"
  }
}
```

---

## 3. Create Notification

> Used internally by backend services.

### Endpoint

```
POST /notifications
```

### Request

```json
{
  "userId": "user_1001",
  "title": "Payment Successful",
  "message": "₹1200 payment completed.",
  "type": "PAYMENT",
  "priority": "HIGH",
  "metadata": {
    "paymentId": "pay_123"
  }
}
```

### Response

```json
{
  "success": true,
  "message": "Notification created successfully.",
  "notificationId": "notif_789"
}
```

---

## 4. Mark Notification as Read

### Endpoint

```
PATCH /notifications/{notificationId}/read
```

### Response

```json
{
  "success": true,
  "message": "Notification marked as read."
}
```

---

## 5. Mark Notification as Unread

### Endpoint

```
PATCH /notifications/{notificationId}/unread
```

### Response

```json
{
  "success": true,
  "message": "Notification marked as unread."
}
```

---

## 6. Mark All Notifications as Read

### Endpoint

```
PATCH /notifications/read-all
```

### Response

```json
{
  "success": true,
  "message": "All notifications marked as read."
}
```

---

## 7. Delete Notification

### Endpoint

```
DELETE /notifications/{notificationId}
```

### Response

```json
{
  "success": true,
  "message": "Notification deleted."
}
```

---

## 8. Delete All Notifications

### Endpoint

```
DELETE /notifications
```

### Response

```json
{
  "success": true,
  "message": "All notifications deleted."
}
```

---

## 9. Get Unread Notification Count

### Endpoint

```
GET /notifications/unread/count
```

### Response

```json
{
  "success": true,
  "unreadCount": 12
}
```

---

# Standard Error Response

```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Notification not found."
  }
}
```

---

# HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 204 | Deleted Successfully |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

---

# Real-Time Notification Mechanism

## Technology

Use **WebSockets (Socket.IO)** for real-time notification delivery.

---

## Connection

```
ws://server.com/notifications
```

Client connects after login using JWT authentication.

---

## Events

### Client → Server

#### Authenticate

```json
{
  "event": "authenticate",
  "token": "<JWT_TOKEN>"
}
```

---

### Server → Client

#### New Notification

```json
{
  "event": "notification",
  "data": {
    "id": "notif_789",
    "title": "Friend Request",
    "message": "Alice sent you a friend request.",
    "type": "SOCIAL",
    "priority": "LOW",
    "createdAt": "2026-06-26T12:30:00Z"
  }
}
```

---

#### Notification Updated

```json
{
  "event": "notification_updated",
  "notificationId": "notif_123",
  "isRead": true
}
```

---

#### Notification Deleted

```json
{
  "event": "notification_deleted",
  "notificationId": "notif_456"
}
```

---

#### Unread Count Updated

```json
{
  "event": "unread_count",
  "count": 5
}
```

---

# API Naming Conventions

- Use plural resource names.
- Use HTTP methods according to REST standards.
- Use PATCH for partial updates.
- Use DELETE for deletions.
- Use nouns instead of verbs in endpoints.
- Use camelCase for JSON fields.
- Use ISO 8601 format for timestamps.

---

# Authentication

Every request must include:

```
Authorization: Bearer <JWT_TOKEN>
```

---

# Summary of Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /notifications | List notifications |
| GET | /notifications/{id} | Get notification |
| POST | /notifications | Create notification |
| PATCH | /notifications/{id}/read | Mark as read |
| PATCH | /notifications/{id}/unread | Mark as unread |
| PATCH | /notifications/read-all | Mark all as read |
| DELETE | /notifications/{id} | Delete notification |
| DELETE | /notifications | Delete all notifications |
| GET | /notifications/unread/count | Unread count |
| WebSocket | /notifications | Real-time notifications |