/* This Source Code Form is subject to the terms of the Mozilla Public
 * License. v. 2.0. If a copy of the MPL was not distributed with this file.
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from 'react'

// Components
import { Button, Modal, TextAreaClipboard } from 'brave-ui'

// Feature-specific components
import {
  ModalHeader,
  ModalTitle,
  ModalSubTitle,
  ModalContent,
  ThreeColumnButtonGrid,
  ThreeColumnButtonGridCol2,
  ThreeColumnButtonGridCol1
} from 'brave-ui/features/sync'

// Modals
import ScanCodeModal from './scanCode'

// Utils
import { getLocale } from '../../../../common/locale'

interface Props {
  fromMobileScreen?: boolean
  syncData: Sync.State
  actions: any
  onClose: () => void
}

interface State {
  useCameraInstead: boolean
}

export default class AddNewChainCameraOptionModal extends React.PureComponent<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      useCameraInstead: false
    }
  }

  onClickUseCameraInsteadButton = () => {
    this.setState({ useCameraInstead: !this.state.useCameraInstead })
  }

  render () {
    const { fromMobileScreen, onClose, syncData, actions } = this.props
    const { useCameraInstead } = this.state

    return (
      <Modal id='addNewChainCameraOptionModal' onClose={onClose} size='small'>
        {
          useCameraInstead
            ? <ScanCodeModal syncData={syncData} actions={actions} onClose={this.onClickUseCameraInsteadButton} />
            : null
        }
        <ModalHeader>
          <div>
            <ModalTitle level={1}>
              {
                fromMobileScreen
                  ? getLocale('mobileEnterThisCode')
                  : getLocale('enterThisCode')
              }
            </ModalTitle>
            <ModalSubTitle>{getLocale('syncChainCodeHowTo')}</ModalSubTitle>
          </div>
        </ModalHeader>
        <ModalContent>
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
        </ModalContent>
        <ThreeColumnButtonGrid>
          <ThreeColumnButtonGridCol1>
            <Button
              level='secondary'
              type='accent'
              size='medium'
              onClick={this.onClickUseCameraInsteadButton}
              text={getLocale('useCameraInstead')}
            />
          </ThreeColumnButtonGridCol1>
          <ThreeColumnButtonGridCol2>
            <Button
              level='secondary'
              type='accent'
              size='medium'
              onClick={onClose}
              text={getLocale('previous')}
            />
            <Button
              level='primary'
              type='accent'
              size='medium'
              onClick={onClose}
              disabled={!syncData.isSyncConfigured}
              text={
                !syncData.isSyncConfigured
                ? getLocale('lookingForDevice')
                : getLocale('ok')
              }
            />
          </ThreeColumnButtonGridCol2>
        </ThreeColumnButtonGrid>
      </Modal>
    )
  }
}
