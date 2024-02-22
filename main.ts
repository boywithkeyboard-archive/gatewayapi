export class SMS {
  #token

  constructor(options: {
    token: string
  }) {
    this.#token = options.token
  }

  async sendMessage(options: {
    /**
     * If specified, send status notifications to this URL. Otherwise use the default webhook if set.
     */
    callbackUrl?: string
  
    /**
     * The message class, `standard`, `premium` or `secret` to use for this request. If specified it must be the same for all messages in the request.
     *
     * The secret class can be used to blur the message content you send, used for very sensitive data. It is priced as Premium Class and uses the same routes, which anonymizes all sensitive data in your message once it has been sent. Access to the secret class is very strictly controlled.
     *
     * @default 'standard'
     */
    class?:
      | 'standard'
      | 'premium'
      | 'secret'
  
    /**
     * Get more details about the number of parts sent to each recipient.
     */
    detailed?: boolean
  
    /**
     * Encoding to use when sending the message. Defaults to `UTF8`, which means we will use [GSM-7](https://gatewayapi.com/docs/glossary/#gsm-7). Use `UCS2` to send a [unicode](https://gatewayapi.com/docs/glossary/#ucs-2) message.
     */
    encoding?: string
  
    /**
     * **A number between 1 and 255 used to limit the number of SMS messages a single message will send**.
     *
     * Can be used if you send SMS messages from systems that generate messages that you cannot control. This way you can ensure that you do not send very long SMS messages. You will not be charged for more than the amount specified here.
     *
     * *Cannot be used with tags or binary SMS messages!*
     */
    maxParts?: number
  
    /**
     * The content of the SMS, always specified in UTF-8 encoding, which we will transcode depending on the `encoding` field. The default is the usual [GSM-7](https://gatewayapi.com/docs/glossary/#gsm-7) encoding.
     */
    message: string
  
    /**
     * Up to 11 alphanumeric characters, or 15 digits, that will be shown as the sender of the SMS.
     */
    sender: string
  
    /**
     * Unix timestamp (seconds since epoch) to schedule message sending at a certain time.
     */
    sendTime?: number
  
    priority?:
      | 'BULK'
      | 'NORMAL'
      | 'URGENT'
      | 'VERY_URGENT'
  
    /**
     * The [MSISDN](https://gatewayapi.com/docs/glossary/#msisdn) of the recipient.
     */
    to:
      | number
      | {
        msisdn: number | string
        charge?: Record<string, unknown>
        tags?: string[]
      }
      | ({
        msisdn: number | string
        charge?: Record<string, unknown>
        tags?: string[]
      } | number)[]
  
    /**
     * Use `DISPLAY` to send a "flash SMS", a message displayed on screen immediately but not saved in the normal message inbox on the mobile device. Default value is MOBILE for normal SMS.
     */
    type?:
      | 'DISPLAY'
      | 'MOBILE'
      | 'SIMCARD'
      | 'EXTUNIT'
  
    /**
     * User Data Header (UDH) to enable additional functionality for binary SMS, encoded as Base64.
     */
    udh?: string
  
    /**
     * A opaque string reference, you may set to keep track of the message in your own systems. Returned to you when you receive [Delivery Statuses](https://gatewayapi.com/docs/glossary/#dsn).
     */
    userRef?: string
  
    /**
     * Specified in seconds. If message is not delivered within this timespan, it will expire and you will get a notification. The minimum value is `60`. Every value under 60 will be set to `60`. The default expiry - and maximum - for all messages is 5 days. Some messages might expire before that.
     */
    validityPeriod?: number
  }) {
    const encodedToken = Buffer.from(this.#token + ':').toString('base64')

    const res = await fetch('https://gatewayapi.com/rest/mtsms', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${encodedToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        callback_url: options.callbackUrl,
        class: options.class,
        destaddr: options.type,
        encoding: options.encoding,
        extra_details: options.detailed ? 'recipients_usage' : undefined,
        max_parts: options.maxParts,
        message: options.message,
        priority: options.priority,
        recipients: typeof options.to === 'number'
          ? [{
            msisdn: options.to
          }]
          : options.to instanceof Array
          ? options.to.map(i => {
            if (typeof i !== 'number')
              return {
                msisdn: i.msisdn,
                charge: i.charge,
                tags: i.tags
              }
  
            return {
              msisdn: i
            }
          })
          : [options.to],
        sender: options.sender,
        sendtime: options.sendTime,
        udh: options.udh,
        userref: options.userRef,
        validity_period: options.validityPeriod
      })
    })
  
    return res
  }
}
