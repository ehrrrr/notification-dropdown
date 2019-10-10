const data = [
	{
		id: 1321,

		type: 'text',

		title: 'Test notification 1',

		text: 'Test text notification',

		expires: 3600
	},

	{
		id: 4322,

		type: 'bonus',

		title: 'You win a bonus!',

		requirement: 'Deposit $50 to win',

		expires: 3600
	},

	{
		id: 5453,

		type: 'Promotion',

		image: 'https://www.freeiconspng.com/uploads/leistungen-promotion-icon-png-0.png',

		title: '%30 off on sports betting',

		link: 'https://www.google.com/'
	},

	{
		id: 5236,

		type: 'text',

		title: 'Test notification 2',

		text: 'Test text notification',

		expires: 5
	}
];

const notificationsDropdown = document.getElementById('dropdown-body');

class Notification {
	constructor(id, type, title) {
		this.id = id;
		this.type = type;
		this.title = title;
	}

	createNotification(image, text) {
		const notification = document.createElement('div');
		notification.classList.add('notification');
		notificationsDropdown.appendChild(notification);

		const notificationBadgeContainer = document.createElement('div');
		notificationBadgeContainer.classList.add('notification-row');
		notification.appendChild(notificationBadgeContainer);

		const notificationBody = document.createElement('div');
		notificationBody.classList.add('notification-body');

		if (arguments[0]) {
			const notificationImage = document.createElement('img');
			notificationImage.classList.add('image');
			notificationImage.classList.add('column');
			notificationImage.src = image;
			notificationBody.appendChild(notificationImage);
		}

		if (arguments[1]) {
			notificationBody.appendChild(text);
		}

		notification.appendChild(notificationBody);

		const notificationDateContainer = document.createElement('div');
		notificationDateContainer.classList.add('notification-row');
		notification.appendChild(notificationDateContainer);

		const notificationDate = document.createElement('span');
		notificationDate.classList.add('time');
		notificationDate.innerText = new Date().toLocaleTimeString();
		notificationDateContainer.appendChild(notificationDate);
	}

	createTextBody(title, text) {
		const notificationTextContainer = document.createElement('div');
		notificationTextContainer.classList.add('notification-text');
		notificationTextContainer.classList.add('column');

		const centering = document.createElement('div');
		centering.classList.add('vertical-center-text');
		notificationTextContainer.appendChild(centering);

		const notificationTitle = document.createElement('p');
		notificationTitle.classList.add('title');
		notificationTitle.innerText = title;
		centering.appendChild(notificationTitle);

		const notificationText = document.createElement('p');
		notificationText.innerText = text;
		centering.appendChild(notificationText);

		return notificationTextContainer;
	}
}

class TextNotification extends Notification {
	constructor(id, title, text, expires) {
		super(id, 'text', title);
		this.text = text;
		this.expires = expires;
	}
}

class BonusNotification extends Notification {
	constructor(id, title, requirement, expires) {
		super(id, 'bonus', title);
		this.requirement = requirement;
		this.expires = expires;
	}
}

class PromotionNotification extends Notification {
	constructor(id, title, image, link) {
		super(id, 'Promotion', title);
		this.image = image;
		this.link = link;
	}
}

const allNotifications = [];
data.forEach(function(notification) {
	if (notification.type === 'text') {
		const textNotif = new TextNotification(
			notification.id,
			notification.title,
			notification.text,
			notification.expires
		);
		const text = textNotif.createTextBody(textNotif.title, textNotif.text);
		textNotif.createNotification('./images/text.svg', text);
		allNotifications.push(textNotif);
	} else if (notification.type === 'bonus') {
		const bonusNotif = new BonusNotification(
			notification.id,
			notification.title,
			notification.requirement,
			notification.expires
		);
		const text = bonusNotif.createTextBody(bonusNotif.title, bonusNotif.requirement);
		bonusNotif.createNotification('./images/bonus.svg', text);
		allNotifications.push(bonusNotif);
	} else if (notification.type === 'Promotion') {
		const promoNotif = new PromotionNotification(
			notification.id,
			notification.title,
			notification.image,
			notification.link
		);
		const text = promoNotif.createTextBody(promoNotif.title, promoNotif.link);
		promoNotif.createNotification(promoNotif.image, text);
		allNotifications.push(promoNotif);
	}
});

console.log(allNotifications);
