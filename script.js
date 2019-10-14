const data = [
	[
		{
			id: 1321,

			type: 'text',

			title: 'Test notification 1',

			text: 'Test text notification!!!',

			expires: 3600
		},

		{
			id: 4322,

			type: 'bonus',

			title: 'You win a bonus!',

			requirement: 'Deposit $50 to win',

			expires: 5600
		},

		{
			id: 5453,

			type: 'Promotion',

			image: 'https://www.freeiconspng.com/uploads/leistungen-promotion-icon-png-0.png',

			title: '%40 off on sports betting',

			link: 'https://www.google.com/'
		},

		{
			id: 5236,

			type: 'text',

			title: 'Test notification 2',

			text: 'Test text notification',

			expires: 2000
		}
	],

	[
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

			expires: 5600
		},

		{
			id: 5453,

			type: 'Promotion',

			image: 'https://www.freeiconspng.com/uploads/leistungen-promotion-icon-png-0.png',

			title: '%30 off on sports betting',

			link: 'https://www.google.com/'
		},

		{
			id: 1329,

			type: 'text',

			title: 'Test note',

			text: 'Test text notification',

			expires: 2600
		},

		{
			id: 4372,

			type: 'bonus',

			title: 'You win a bonus!',

			requirement: 'Deposit $50 to win',

			expires: 4600
		}
	],

	[
		{
			id: 4322,

			type: 'bonus',

			title: 'You win a bonus!',

			requirement: 'Deposit $50 to win',

			expires: 5600
		},

		{
			id: 5453,

			type: 'Promotion',

			image: 'https://www.freeiconspng.com/uploads/leistungen-promotion-icon-png-0.png',

			title: '%30 off on sports betting',

			link: 'https://www.google.com/'
		},

		{
			id: 5322,

			type: 'bonus',

			title: 'You win a bonus!',

			requirement: 'Deposit $100 to win',

			expires: 7600
		},

		{
			id: 5236,

			type: 'text',

			title: 'Test notification 2',

			text: 'Test text notification',

			expires: 2000
		},
		{
			id: 3453,

			type: 'Promotion',

			image: 'https://www.freeiconspng.com/uploads/leistungen-promotion-icon-png-0.png',

			title: '%50 off on horse betting',

			link: 'https://www.google.com/'
		}
	]
];

class Notification {
	constructor(id, type, title) {
		this.id = id;
		this.type = type;
		this.title = title;
	}

	updateNotification(notification) {
		console.log('update notification:', this);
		let node = document.getElementById(notification.id);
		let nodeImage = node.getElementsByTagName('img')[0];
		let nodeTitle = node.getElementsByTagName('p')[0];
		let nodeText = node.getElementsByTagName('p')[1];
		let nodeBadge = node.getElementsByClassName('notification-badge')[0];
		nodeBadge.classList.remove('notification-badge-new');
		nodeBadge.classList.remove('notification-badge-update');
		nodeBadge.innerHTML = '';

		if (nodeImage.src != notification.image || nodeTitle.innerText != notification.title) {
			nodeImage.src = notification.image;
			nodeTitle.innerText = notification.title;
			this.image = notification.image;
			this.title = notification.title;
			nodeBadge.classList.add('notification-badge-update');
			nodeBadge.innerHTML = '<span class="vertical-center-text">updated</span>';

			if (notification.type === 'text' && nodeText.innerText != notification.text) {
				nodeText.innerText = notification.text;
				this.text = notification.text;
			} else if (notification.type === 'bonus' && nodeText.innerText != notification.requirement) {
				nodeText.innerText = notification.requirement;
				this.requirement = notification.requirement;
			} else if (notification.type === 'Promotion' && nodeText.innerText != notification.link) {
				nodeText.innerText = notification.link;
				this.link = notification.link;
			}
			if (notification.expires) {
				this.expires = notification.expires;
			}
		}
	}

	createNotification(image, text) {
		const notificationsDropdown = document.getElementById('dropdown-body');
		const notification = document.createElement('div');
		notification.setAttribute('id', this.id);
		notification.classList.add('notification');
		notification.classList.add('visible');
		notificationsDropdown.appendChild(notification);

		const notificationBadgeContainer = document.createElement('div');
		notificationBadgeContainer.classList.add('notification-row');
		notificationBadgeContainer.innerHTML =
			'<div class="notification-badge notification-badge-new"><span class="vertical-center-text">new</span></div>';
		notification.appendChild(notificationBadgeContainer);

		const notificationBody = document.createElement('div');
		notificationBody.classList.add('notification-body');

		if (image) {
			this.image = image;
			const notificationImage = document.createElement('img');
			notificationImage.classList.add('image');
			notificationImage.classList.add('column');
			notificationImage.src = image;
			notificationBody.appendChild(notificationImage);
		}

		if (text) {
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

class NotificationList {
	constructor() {
		this.count = 0;
		this.notifications = [];
	}

	displayCounter() {
		let countNum = document.getElementById('notification-num');
		countNum.innerText = this.count;
	}

	addNode(notification) {
		if (notification.type != 'bonus') {
			this.count++;
			this.displayCounter();
		}
		if (notification.type === 'text') {
			const textNotif = new TextNotification(
				notification.id,
				notification.title,
				notification.text,
				notification.expires
			);
			const text = textNotif.createTextBody(textNotif.title, textNotif.text);
			textNotif.createNotification('./images/text.svg', text);
			this.notifications.push(textNotif);
		} else if (notification.type === 'bonus') {
			const bonusNotif = new BonusNotification(
				notification.id,
				notification.title,
				notification.requirement,
				notification.expires
			);
			const text = bonusNotif.createTextBody(bonusNotif.title, bonusNotif.requirement);
			bonusNotif.createNotification('./images/bonus.svg', text);
			this.notifications.push(bonusNotif);
		} else if (notification.type === 'Promotion') {
			const promoNotif = new PromotionNotification(
				notification.id,
				notification.title,
				notification.image,
				notification.link
			);
			const text = promoNotif.createTextBody(promoNotif.title, promoNotif.link);
			promoNotif.createNotification(promoNotif.image, text);
			this.notifications.push(promoNotif);
		}
	}

	removeNode(notification) {
		let node = document.getElementById(notification.id);
		node.className = node.className + ' hiden';
		setTimeout(function() {
			node.parentNode.removeChild(node);
		}, 500);

		let index = this.notifications.indexOf(notification);
		if (index > -1) {
			this.notifications.splice(index, 1);
		}

		if (notification.type != 'bonus') {
			this.count--;
			this.displayCounter();
		}
	}
}

const notificationList = new NotificationList();
function displayNotifications() {
	const response = data[Math.floor(Math.random() * data.length)];
	const notificationsDropdown = document.getElementById('dropdown-body');
	const displayedNotifications = notificationsDropdown.getElementsByClassName('notification');
	const oldNotifications = [ ...displayedNotifications ];

	if (displayedNotifications.length > 0) {
		for (let i = 0; i < displayedNotifications.length; i++) {
			const existInNewRequest = response.find((notification) => {
				return notification.id.toString() === displayedNotifications[i].id.toString();
			});
			if (!existInNewRequest) {
				const removeNode = document.getElementById(displayedNotifications[i].id.toString());
				notificationsDropdown.removeChild(removeNode);
			}
		}
	}

	response.forEach(function(notification) {
		const indexInOldRequest = oldNotifications.findIndex((oldNotif) => {
			return oldNotif.id.toString() === notification.id.toString();
		});
		if (indexInOldRequest === -1) {
			notificationList.addNode(notification);
		} else if (indexInOldRequest >= 0) {
			notificationList[indexInOldRequest].updateNode(notification);
		}
		if (notification.expires) {
			setTimeout(
				function() {
					notificationList.removeNode(notification);
				},
				notification.expires,
				notification
			);
		}
	});
	// console.log(notificationList);
}

displayNotifications();
/***
 * Repeatedly calls a function or executes a code snippet, 
 * with a fixed time delay between each call. It returns an interval ID
 *  which uniquely identifies the interval, 
 * so you can remove it later by calling clearInterval()
 */
const intervalID = window.setInterval(displayNotifications, 10000);

const btn = document.getElementById('notif-btn');
btn.addEventListener('click', (e) => {
	var dropdown = document.querySelector('.dropdown-content'); // Using a class instead, see note below.
	dropdown.classList.toggle('hiden');
	dropdown.classList.toggle('visible');
});
