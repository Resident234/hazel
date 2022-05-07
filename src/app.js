import { messagesInitAppListeners } from './services/messages'
import { getInitiationStrategy } from './services/initiation/initiationFactory'
import { onPopupTap } from './services/initiation/onPopupTap'

(async () => {
  let initiation = await getInitiationStrategy()
  initiation()
})()


