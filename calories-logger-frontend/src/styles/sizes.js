const sizes = {
  inputFieldHeight: '46px',
  borderRadius: '5px',
  buttonBorderRadius: '30px',

  // padding
  tinyPadding: '10px',
  smallPadding: '7px',
  largePadding: '12px',
  extraLargePadding: '15px',

  // z-index
  dropdownIndex: 3,
  // media
  media: {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px'
  }
}

export default sizes

export const giant = `@media (min-width: ${sizes.media.desktop})`
export const desktop = `@media (max-width: ${sizes.media.giant}) and (min-width: ${
  sizes.media.desktop
})`
export const laptop = `@media (max-width: ${sizes.media.laptop})`
export const phone = `@media (max-width: ${sizes.media.phone})`
export const tablet = `@media (max-width: ${sizes.media.tablet})`
export const tiny = `@media (max-width: ${sizes.media.tiny})`
export const mobileM = `@media (max-width: ${sizes.media.mobileM})`
export const mobileS = `@media (max-height: ${sizes.media.mobileS})`
