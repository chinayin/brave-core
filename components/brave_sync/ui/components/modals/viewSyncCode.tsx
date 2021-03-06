/* This Source Code Form is subject to the terms of the Mozilla Public
 * License. v. 2.0. If a copy of the MPL was not distributed with this file.
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from 'react'

 // Components
import { Button, Modal, TextAreaClipboard } from 'brave-ui'

// Feature-specific components
import {
  ViewSyncCodeGrid,
  ModalTitle,
  TwoColumnButtonGrid
} from 'brave-ui/features/sync'

// Utils
import { getLocale } from '../../../../common/locale'

// Images
import { QRCode } from 'brave-ui/features/sync/images'

interface Props {
  syncData: Sync.State
  actions: any
  onClose: () => void
}

export default class ViewSyncCodeModal extends React.PureComponent<Props, {}> {
  render () {
    const { onClose, syncData } = this.props

    return (
      <Modal id='viewSyncCodeModal' onClose={onClose} size='small'>
        <ViewSyncCodeGrid>
          <div>
            <ModalTitle level={3}>{getLocale('wordCode')}</ModalTitle>
          {
            syncData.syncWords
            ? (
              <TextAreaClipboard
                copiedString={getLocale('copied')}
                wordCountString={getLocale('wordCount')}
                readOnly={true}
                defaultValue={syncData.syncWords}
              />
            )
            : null
          }
          </div>
          <div>
            <ModalTitle level={3}>{getLocale('qrCode')}</ModalTitle>
            {
              syncData.seedQRImageSource
                ? (
                  <QRCode
                    size='small'
                    src={syncData.seedQRImageSource}
                    style={{
                      // TODO: @cezaraugusto fix this in brave-ui
                      border: '1px solid #DFDFE8'
                    }}
                  />
                )
                : null
            }
          </div>
        </ViewSyncCodeGrid>
        <TwoColumnButtonGrid>
          <div>{getLocale('privateKey')}</div>
          <Button
            level='primary'
            type='accent'
            size='medium'
            onClick={onClose}
            text={getLocale('done')}
          />
        </TwoColumnButtonGrid>
      </Modal>
    )
  }
}
