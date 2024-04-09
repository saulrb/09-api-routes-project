import React, { FC, Fragment } from 'react'

import { buildFeedbackPath, extractFeedback } from '../app/api/feedback/route'

type Props = {
  feedbackItems: [any]
}

const FeedbackPage: FC<Props> = ({ feedbackItems }) => {
  return (
    <Fragment>
      <ul>
        {feedbackItems.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </Fragment>
  )
}

export const getStaticProps = async () => {
  const filePath = buildFeedbackPath()
  const data = extractFeedback(filePath)
  return {
    props: {
      feedbackItems: data
    }
  }
}

export default FeedbackPage
