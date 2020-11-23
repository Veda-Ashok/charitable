import React, { useState } from 'react'
import PropTypes from 'prop-types'
import SearchListItems from './SearchListItems'
import SearchDialog from './SearchDialog'
import OrgDialog from './OrgDialog'
import TrendingListItems from './TrendingListItems'

export default function InfoSmallBox({ result, type, dbuser, showPopup }) {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      {type === 'trending' ? (
        <>
          <TrendingListItems orgDetails={result} onClick={() => handleClickOpen()} />
          {showPopup && (
            <OrgDialog org={result} open={open} onClose={handleClose} dbuser={dbuser} />
          )}
        </>
      ) : (
        <>
          <SearchListItems onClick={() => handleClickOpen()} result={result} type={type} />
          {showPopup && (
            <SearchDialog
              result={result}
              open={open}
              onClose={handleClose}
              type={type}
              dbuser={dbuser}
            />
          )}
        </>
      )}
    </div>
  )
}

InfoSmallBox.propTypes = {
  result: PropTypes.object,
  type: PropTypes.string,
  dbuser: PropTypes.object,
  showPopup: PropTypes.bool,
}
