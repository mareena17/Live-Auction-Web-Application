package com.bidbig.notification.service;

import com.bidbig.notification.domain.Recipient;

import com.bidbig.notification.domain.*;

public interface NotificationService {

	void sendBackupNotifications();

	void sendRemindNotifications();

	String sendResetNotification(ResetRequest request);
}
