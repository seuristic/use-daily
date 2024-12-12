import { Helmet, HelmetData } from 'react-helmet-async'

type HeadProps = {
  title?: string
  description?: string
}

const helmetData = new HelmetData({})

export const Head = ({ title, description }: HeadProps) => {
  return (
    <Helmet
      title={title ? `${title} | usedaily` : undefined}
      helmetData={helmetData}
      defaultTitle="usedaily"
    >
      <meta name="description" content={description} />
    </Helmet>
  )
}
