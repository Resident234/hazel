import { settingsGet } from '../settings'
import { onPopupTap } from './onPopupTap'

export const getInitiationStrategy = async () => {
  let name = await settingsGet('initiation')
  if (name === 'onPopupTap') {
    return onPopupTap
  } else {
    return onPopupTap
  }
}
