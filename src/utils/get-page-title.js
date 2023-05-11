import defaultSettings from '@/settings'

const title = defaultSettings.title || '多果多贝-测试'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
