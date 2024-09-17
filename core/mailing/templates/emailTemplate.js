module.exports.emailConfirmationTemplate = (verificationCode, userName) => {
  return `
    <!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" style="color-scheme: light dark;">

<head>
    <meta charset="utf-8">
    <meta name="x-apple-disable-message-reformatting">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no">
    <meta name="color-scheme" content="light dark">
    <meta name="supported-color-schemes" content="light dark">
    <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings xmlns:o="urn:schemas-microsoft-com:office:office">
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <style>
    td,th,div,p,a,h1,h2,h3,h4,h5,h6 {font-family: "Segoe UI", sans-serif; mso-line-height-rule: exactly;}
  </style>
  <![endif]-->
    <style>
        :root {
            color-scheme: light dark;
        }

        @media (max-width: 600px) {
            .sm-w-full {
                width: 100% !important;
            }

            .sm-px-6 {
                padding-left: 24px !important;
                padding-right: 24px !important;
            }

            .sm-py-8 {
                padding-top: 32px !important;
                padding-bottom: 32px !important;
            }

            .sm-leading-8 {
                line-height: 32px !important;
            }
        }
    </style>
</head>

<body style="-webkit-font-smoothing: antialiased; word-break: break-word; margin: 0; width: 100%; padding: 0">
    <div role="article" aria-roledescription="email" aria-label lang="en">
        <table style="width: 100%; font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
            cellpadding="0" cellspacing="0" role="presentation">
            <tr>
                <td align="center" style="background-color: #1E1E1E">
                    <table class="sm-w-full" style="width: 600px; border-radius: 8px" cellpadding="0" cellspacing="0"
                        role="presentation">
                        <tr>
                            <td class="sm-py-8 sm-px-6" style="padding: 48px; text-align: center">
                                <div>
                                    <img src="https://gateway.pinata.cloud/ipfs/QmXaWu88PnAiCDg58E6cLXccZaGdUpyXmsdeV4cVmkuqjo?_gl=1*89u0ca*_ga*NDYyMTUxMzUzLjE2Nzc0NDY0Nzk.*_ga_5RMPXG14TE*MTY3NzQ0NjQ3OS4xLjEuMTY3NzQ0Njg0My4yNC4wLjA." width="170" alt="Maizzle" style="max-width: 100%; vertical-align: middle">
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" class="sm-px-6">
                                <table style="width: 100%" cellpadding="0" cellspacing="0" role="presentation">
                                    <tr>
                                        <td class="sm-px-6"
                                            style="background-color: #1E1E1E; padding: 48px; text-align: center; font-size: 16px; line-height: 24px; color: #fff; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05)">
                                            <p style="padding-bottom: 16px; font-size: 27px; font-weight: 600">
                                                E-Mail Verification
                                            </p>
                                            <p class="sm-leading-8"
                                                style="margin: 0; margin-bottom: 24px; font-size: 16px; font-weight: 500; color: #fff">
                                                Hello, ${userName}
                                            </p>
                                            <p style="margin: 0; margin-bottom: 24px; font-size: 15px">
                                                We're happy that you're joining Mercury.
                                                Please confirm your email address to start exploring.
                                            </p>
                                            <div style="padding-bottom: 32px; line-height: 100%; text-align:center">
                                                <div
                                                    style="text-align:center; width:90px; margin:auto; background: linear-gradient(90deg, #FF8200 -5.1%, #FFB05E 95.62%); display: block; border-radius: 25px; border-style: none; padding-left: 24px; padding-right: 24px; padding-top: 12px; padding-bottom: 12px; font-size: 20px; font-weight: 700; color: white">
                                                    <span>${verificationCode}</span>
                                                </div>
                                                <div style="text-align:center; margin:auto;">
                                                    <img style="text-align:center; padding-top:20px; width:30px" src="https://gateway.pinata.cloud/ipfs/QmSmqJuzgtn2MR2wEJ7c4wufa9X8ZybZyVQXUfP1tGcVxJ?_gl=1*1sb3209*_ga*NDYyMTUxMzUzLjE2Nzc0NDY0Nzk.*_ga_5RMPXG14TE*MTY3NzQ0NjQ3OS4xLjEuMTY3NzQ0ODMzNi4zOC4wLjA." style="display: block; width: 28px" alt="">
                                                    </div>
                                            </div>
                                            <p style="margin: 0; margin-bottom: 2px; font-weight: 500">
                                                Welcome to Mercury!
                                            </p>
                                            <p style="margin: 0; font-size: 12px; font-weight: 500; color: #B9B9B9">
                                                Mercury Team.
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>
</body>

</html>
    `
}

module.exports.passwordResetTemplate = (link, userName, firstName) => {
  return `
    <!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" style="color-scheme: light dark;">
<head>
  <meta charset="utf-8">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings xmlns:o="urn:schemas-microsoft-com:office:office">
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <style>
    td,th,div,p,a,h1,h2,h3,h4,h5,h6 {font-family: "Segoe UI", sans-serif; mso-line-height-rule: exactly;}
  </style>
  <![endif]-->
  <style>:root {
  color-scheme: light dark;
}
@media (max-width: 600px) {
  .sm-w-full {
    width: 100% !important;
  }
  .sm-px-6 {
    padding-left: 24px !important;
    padding-right: 24px !important;
  }
  .sm-py-8 {
    padding-top: 32px !important;
    padding-bottom: 32px !important;
  }
  .sm-leading-8 {
    line-height: 32px !important;
  }
}</style></head>
<body style="-webkit-font-smoothing: antialiased; word-break: break-word; margin: 0; width: 100%; padding: 0">
  <div role="article" aria-roledescription="email" aria-label lang="en">        <table style="width: 100%; font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
                <td align="center" style="background-color: #1E1E1E">
                    <table class="sm-w-full" style="width: 600px; border-radius: 8px" cellpadding="0" cellspacing="0" role="presentation">
                        <tr>
                            <td class="sm-py-8 sm-px-6" style="padding: 48px; text-align: center">
                                <div>
                                    <img src="https://gateway.pinata.cloud/ipfs/QmXaWu88PnAiCDg58E6cLXccZaGdUpyXmsdeV4cVmkuqjo?_gl=1*89u0ca*_ga*NDYyMTUxMzUzLjE2Nzc0NDY0Nzk.*_ga_5RMPXG14TE*MTY3NzQ0NjQ3OS4xLjEuMTY3NzQ0Njg0My4yNC4wLjA." width="170" alt="Maizzle" style="max-width: 100%; vertical-align: middle">
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" class="sm-px-6">
                                <table style="width: 100%" cellpadding="0" cellspacing="0" role="presentation">
                                    <tr>
                                        <td class="sm-px-6" style="background-color: #1E1E1E; padding: 48px; text-align: center; font-size: 16px; line-height: 24px; color: #fff; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05)">
                                            <p style="padding-bottom: 16px; font-size: 25px; font-weight: 600;color:#fff">
                                                Mercury Reset Password
                                            </p>
                                            <p class="sm-leading-8" style="margin: 0; margin-bottom: 14px; font-size: 16px; font-weight: 500; color: #fff">
                                                Hello, ${userName}
                                            </p>
                                            <p style="margin: 0; margin-bottom: 10px; font-size: 14px;color: #fff">
                                               Hello ${firstName}, we heard that you lost the Mercury password.
                                            </p>
                                            <p style="font-size: 14px;font-weight:500; border-top:1px solid #f0f0f0; padding-top:10px;padding-bottom:10px;color: #fff">
                                                 No need to worry! You can update your password by clicking the button we sent you.
                                            </p>
                                            <div style="padding-bottom: 32px;width:100%; margin:auto; line-height: 100%; text-align:center">
                                                <button style="color:#fff;text-align:center; margin:auto;background: linear-gradient(90deg, #FF8200 -5.1%, #FFB05E 95.62%); display: block; border-radius: 30px; border-style: none; padding-left: 12px; padding-right: 12px; padding-top: 12px; padding-bottom: 12px; font-size: 16px; font-weight: 600">
                                                    ${link}</button>
                                                 <div style="text-align:center; margin:auto;">
                                                        <img style="text-align:center; padding-top:15px; width:30px" src="https://gateway.pinata.cloud/ipfs/QmSmqJuzgtn2MR2wEJ7c4wufa9X8ZybZyVQXUfP1tGcVxJ?_gl=1*1sb3209*_ga*NDYyMTUxMzUzLjE2Nzc0NDY0Nzk.*_ga_5RMPXG14TE*MTY3NzQ0NjQ3OS4xLjEuMTY3NzQ0ODMzNi4zOC4wLjA." style="display: block; width: 28px" alt="">
                                                    </div>
                                            </div>
                                            <p style="margin: 0; font-size: 12px; font-weight: 500; color: #B9B9B9">
                                                Mercury Team.
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>  </div>
</body>
</html>
    `
}

module.exports.orderStartedTemplate = (matchedUser, user) => {
  return `
  <!DOCTYPE html>
  <html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" style="color-scheme: light dark;">
  
  <head>
      <meta charset="utf-8">
      <meta name="x-apple-disable-message-reformatting">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no">
      <meta name="color-scheme" content="light dark">
      <meta name="supported-color-schemes" content="light dark">
      <!--[if mso]>
    <noscript>
      <xml>
        <o:OfficeDocumentSettings xmlns:o="urn:schemas-microsoft-com:office:office">
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    </noscript>
    <style>
      td,th,div,p,a,h1,h2,h3,h4,h5,h6 {font-family: "Segoe UI", sans-serif; mso-line-height-rule: exactly;}
    </style>
    <![endif]-->
      <style>
          :root {
              color-scheme: light dark;
          }
  
          @media (max-width: 600px) {
              .sm-w-full {
                  width: 100% !important;
              }
  
              .sm-px-6 {
                  padding-left: 24px !important;
                  padding-right: 24px !important;
              }
  
              .sm-py-8 {
                  padding-top: 32px !important;
                  padding-bottom: 32px !important;
              }
  
              .sm-leading-8 {
                  line-height: 32px !important;
              }
          }
      </style>
  </head>
  
  <body style="-webkit-font-smoothing: antialiased; word-break: break-word; margin: 0; width: 100%; padding: 0">
      <div role="article" aria-roledescription="email" aria-label lang="en">
          <table style="width: 100%; font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
              cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                  <td align="center" style="background-color: #1E1E1E">
                      <table class="sm-w-full" style="width: 600px; border-radius: 8px" cellpadding="0" cellspacing="0"
                          role="presentation">
                          <tr>
                              <td class="sm-py-8 sm-px-6" style="padding: 48px; text-align: center">
                                  <div>
                                      <img src="https://gateway.pinata.cloud/ipfs/QmXaWu88PnAiCDg58E6cLXccZaGdUpyXmsdeV4cVmkuqjo?_gl=1*89u0ca*_ga*NDYyMTUxMzUzLjE2Nzc0NDY0Nzk.*_ga_5RMPXG14TE*MTY3NzQ0NjQ3OS4xLjEuMTY3NzQ0Njg0My4yNC4wLjA." width="170" alt="Maizzle" style="max-width: 100%; vertical-align: middle">
                                  </div>
                              </td>
                          </tr>
                          <tr>
                              <td align="center" class="sm-px-6">
                                  <table style="width: 100%" cellpadding="0" cellspacing="0" role="presentation">
                                      <tr>
                                          <td class="sm-px-6"
                                              style="background-color: #1E1E1E; padding: 48px; text-align: center; font-size: 16px; line-height: 24px; color: #fff; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05)">
                                              <p style="padding-bottom: 16px; font-size: 27px; font-weight: 600;color:#fff">
                                                  Order Started!
                                              </p>
                                              <p class="sm-leading-8"
                                                  style="margin: 0; margin-bottom: 15px; font-size: 16px; font-weight: 500; color: #fff">
                                                  Hello, ${matchedUser}
                                              </p>
                                              <p style="margin: 0; margin-bottom: 0px; font-size: 15px;font-weight:600">
                                                 Your match request has been accepted by ${user}.
                                              </p>
                                               <p style="margin: 15px 0px; margin-bottom: 0px; font-size: 16px;font-weight:600; color:#fff;">
                                                 You can track your order on the Mercury orders page!
                                              </p>
                                              <div style="padding-bottom: 20px; line-height: 100%; text-align:center">
                                                  <div style="text-align:center; margin:auto;">
                                                      <img style="text-align:center; padding-top:20px; width:30px" src="https://gateway.pinata.cloud/ipfs/QmSmqJuzgtn2MR2wEJ7c4wufa9X8ZybZyVQXUfP1tGcVxJ?_gl=1*1sb3209*_ga*NDYyMTUxMzUzLjE2Nzc0NDY0Nzk.*_ga_5RMPXG14TE*MTY3NzQ0NjQ3OS4xLjEuMTY3NzQ0ODMzNi4zOC4wLjA." style="display: block; width: 28px" alt="">
                                                      </div>
                                              </div>
                                              <p style="margin: 0; margin-bottom: 2px; font-weight: 500;color:#fff">
                                                  Hurry up!
                                              </p>
                                              <p style="margin: 0; font-size: 12px;margin-top:20px; font-weight: 500; color: #B9B9B9">
                                                  Mercury Team.
                                              </p>
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                      </table>
                  </td>
              </tr>
          </table>
      </div>
  </body>
  
  </html>
  `
}

module.exports.applicationReceived = (waitlistUser) => {
    return `<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" style="color-scheme: light dark;">

<head>
    <meta charset="utf-8">
    <meta name="x-apple-disable-message-reformatting">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no">
    <meta name="color-scheme" content="light dark">
    <meta name="supported-color-schemes" content="light dark">
    <style>
        :root {
            color-scheme: light dark;
        }

        @media (max-width: 600px) {
            .sm-w-full {
                width: 100% !important;
            }

            .sm-px-6 {
                padding-left: 24px !important;
                padding-right: 24px !important;
            }

            .sm-py-8 {
                padding-top: 32px !important;
                padding-bottom: 32px !important;
            }

            .sm-leading-8 {
                line-height: 32px !important;
            }
        }
    </style>
</head>

<body style="-webkit-font-smoothing: antialiased; word-break: break-word; margin: 0; width: 100%; padding: 0">
    <div role="article" aria-roledescription="email" aria-label="" lang="en">
        <table style="width: 100%; font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
                <td align="center" style="background-color: #1E1E1E">
                    <table class="sm-w-full" style="width: 600px; border-radius: 8px" cellpadding="0" cellspacing="0" role="presentation">
                        <tr>
                            <td class="sm-py-8 sm-px-6" style="padding: 48px; text-align: center">
                                <div>
                                    <img src="https://gateway.pinata.cloud/ipfs/QmXaWu88PnAiCDg58E6cLXccZaGdUpyXmsdeV4cVmkuqjo?_gl=1*89u0ca*_ga*NDYyMTUxMzUzLjE2Nzc0NDY0Nzk.*_ga_5RMPXG14TE*MTY3NzQ0NjQ3OS4xLjEuMTY3NzQ0Njg0My4yNC4wLjA." width="170" alt="Maizzle" style="max-width: 100%; vertical-align: middle">
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" class="sm-px-6">
                                <table style="width: 100%" cellpadding="0" cellspacing="0" role="presentation">
                                    <tr>
                                        <td class="sm-px-6" style="background-color: #1E1E1E; padding: 48px; text-align: center; font-size: 16px; line-height: 24px; color: #fff; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05)">
                                            <div style="display: flex; flex-direction: column; row-gap: 20;">
                                                <p style="font-size: large;font-weight: 600;">
                                                    Sayın ${waitlistUser.firstName} ${waitlistUser.lastName},
                                                </p>
                                                <p style="font-weight: 500;">
                                                    Mercury olarak, ilginiz için teşekkür ederiz ve 
                                                    <span style="color: #f07c00;">Wait List</span>'e kaydolduğunuz için teşekkür ederiz. Kaydınız
                                                    başarıyla
                                                    alınmıştır ve sizinle mümkün olan en kısa sürede tekrar iletişim
                                                    kuracağız.
                                                </p>
                                                <p style="font-weight: 500;">
                                                    Sizleri en son bilgilerle güncel tutmak için e-posta adresinizi
                                                    paylaştığınız için memnuniyet duyuyoruz. Yakında <span style="color: #F07A00;">Mercury</span>
                                                    hakkında size daha fazla bilgi vereceğiz ve ürün/hizmetimiz piyasaya
                                                    sürüldüğünde size özel bir teklif sunacağız.
                                                </p>

                                                <p style="font-weight: 500;">
                                                    Bizi tercih ettiğiniz için teşekkür ederiz ve Mercury
                                                    hakkında size en son bilgileri sunmaktan mutluluk duyacağız.
                                                </p>
                                            </div>
                                            <div style="padding-bottom: 10px;width:100%; margin:auto; line-height: 100%; text-align:center">
                                                <div style="text-align:center; margin:auto;">
                                                    <img style="text-align:center; padding-top:15px; width:30px" src="https://gateway.pinata.cloud/ipfs/QmSmqJuzgtn2MR2wEJ7c4wufa9X8ZybZyVQXUfP1tGcVxJ?_gl=1*1sb3209*_ga*NDYyMTUxMzUzLjE2Nzc0NDY0Nzk.*_ga_5RMPXG14TE*MTY3NzQ0NjQ3OS4xLjEuMTY3NzQ0ODMzNi4zOC4wLjA." alt="">
                                                </div>
                                            </div>
                                            <p style="margin: 0; font-size: 12px; font-weight: 500; color: #B9B9B9">
                                                Mercury Team.
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>
</body>

</html>`
}