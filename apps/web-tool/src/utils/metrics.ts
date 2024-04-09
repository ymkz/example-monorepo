import type { Metric } from 'prom-client'
import { Counter, Summary, register } from 'prom-client'

const isCounter = (metric?: Metric<string>): metric is Counter => {
  return metric instanceof Counter
}

const getErrorCounter = (): Counter<'name'> => {
  const name = 'api_error_total'
  const metric = register.getSingleMetric(name)
  if (isCounter(metric)) {
    return metric
  }
  return new Counter({
    name,
    help: 'api_error_total count total of api error labeled with: name',
    labelNames: ['name'],
  })
}

export const incrementErrorCounter = (name: string) => {
  getErrorCounter().labels({ name }).inc()
}

const isSummary = (metric?: Metric<string>): metric is Summary => {
  return metric instanceof Summary
}

const getHttpClientRequestSummary = (): Summary<'name' | 'status_code'> => {
  const name = 'http_client_requests_seconds'
  const metric = register.getSingleMetric(name)
  if (isSummary(metric)) {
    return metric
  }
  return new Summary({
    name,
    help: 'http_client_requests_seconds duration summary of api responses labeled with: name, status_code',
    labelNames: ['name', 'status_code'],
    percentiles: [0.5, 0.9, 0.99],
    maxAgeSeconds: 300,
    ageBuckets: 5,
  })
}

export const startHttpClientRequestSummary = (name: string) => {
  return getHttpClientRequestSummary().startTimer({ name })
}
