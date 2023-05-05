export const usePrint = () => {
  const print = (html: string) => {
    const w = window.open(window.location.href)
    if (!w) return

    w.document.write(html)
    w.print()
    w.close()
  }

  return print
}
