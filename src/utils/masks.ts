export const phoneMask = (phone: string) => {
  const [
    countryDigitOne,
    countryDigitTwo,
    provinceDigitOne,
    provinceDigitTwo,
    ...restDigits
  ] = phone.split('')

  const firstCombined = restDigits.slice(0, 4).join('')
  const secondCombined = restDigits.slice(4).join('')

  return `+${countryDigitOne}${countryDigitTwo} (${provinceDigitOne}${provinceDigitTwo}) ${firstCombined}-${secondCombined}`
}
