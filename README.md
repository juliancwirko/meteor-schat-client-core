## sChat client app for Meteor - core package

For more information about sChat see the documentation: [https://www.simplechat.support/docs](www.simplechat.support/docs)

### Installing sChat box on Meteor App

```bash
$ meteor add schat:client-blaze
```
(`schat:client-core` will be also added)

For now there is only a package for Blaze view layer.

You also need to create account at [https://www.simplechat.support](https://www.simplechat.support)
Include sChatBox template:

```html
<body>
    {{> sChatBox}}
</body>
```

Also, you’ll need to set up the configuration. Do it in the Meteor startup callback on the client side. See this example:

```javascript
Meteor.startup(function () {
    sChat.init('JMSZtbT2RdNrPYYRi', {
        ssl: true,
        welcomeMessage: 'Hi, how can I help you?',
        hostName: 'SimpleChat.Support',
        labels: {
            sendPlaceholder: 'Send the message...',
            headerTitle: 'Welcome on my website!'
        }
    });
});
```