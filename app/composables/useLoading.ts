export const useLoading = () => {
  const isLoading = useState('global-loading', () => false)
  const loadingMessage = useState('global-loading-message', () => 'Memuat Pempek Al-Hijrah...')
  let stopTimeout: ReturnType<typeof setTimeout> | undefined

  const startLoading = (msg?: string) => {
    if (stopTimeout) {
      clearTimeout(stopTimeout)
      stopTimeout = undefined
    }

    if (msg) loadingMessage.value = msg
    isLoading.value = true
  }

  const stopLoading = () => {
    // Add a slight delay to prevent jarring flickering on fast transitions
    if (stopTimeout) clearTimeout(stopTimeout)
    stopTimeout = setTimeout(() => {
      isLoading.value = false
      stopTimeout = undefined
    }, 250)
  }

  return {
    isLoading,
    loadingMessage,
    startLoading,
    stopLoading
  }
}
