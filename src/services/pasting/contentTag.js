import { getInitiationStrategy } from '../initiation/initiationFactory'
import { getComponentInitiation } from '../../components/initiation/componentsFactory'

export const contentTag = (objTextTags, originalTextSplitted, translatedTextSplitted, tags, settings) => {
  let initiationStrategy = getInitiationStrategy(settings.initiation)
  objTextTags.forEach((tag) => {
    if (tag.className.includes('content')) {
      initiationStrategy(tag, originalTextSplitted, translatedTextSplitted)
    }
  })
  let componentStrategy = getComponentInitiation(settings.initiation)
  if (componentStrategy) {
    componentStrategy()
  }
}