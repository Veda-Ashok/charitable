import React, { useState } from 'react'
import PropTypes from 'prop-types'
import SearchListItems from './SearchListItems'
import SearchDialog from './SearchDialog'
import OrgDialog from './OrgDialog'
import TrendingListItems from './TrendingListItems'

export default function InfoSmallBox({
  result,
  type,
  charitUser,
  showPopup,
  refresh,
  setRefresh,
  getPosts,
}) {
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
            <OrgDialog org={result} open={open} onClose={handleClose} charitUser={charitUser} />
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
              charitUser={charitUser}
              refresh={refresh}
              setRefresh={setRefresh}
              getPosts={getPosts}
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
  charitUser: PropTypes.object,
  showPopup: PropTypes.bool,
  setRefresh: PropTypes.func,
  refresh: PropTypes.bool,
  getPosts: PropTypes.any,
}
