import type { Metric } from 'prom-client'
import { Counter, Summary, register } from 'prom-client'

const isCounter = (metric?: Metric<string>): metric is Counter => {
  return metric instanceof Counter
}

const getApiErrorCounter = (): Counter<'name'> => {
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

export const incrementApiErrorCounter = (name: string) => {
  getApiErrorCounter().labels({ name }).inc()
}

const isSummary = (metric?: Metric<string>): metric is Summary => {
  return metric instanceof Summary
}

const getApiRequestSummary = (): Summary<'name' | 'status_code'> => {
  const name = 'api_request_duration_seconds'
  const metric = register.getSingleMetric(name)
  if (isSummary(metric)) {
    return metric
  }
  return new Summary({
    name,
    help: 'api_request_duration_seconds duration summary of api responses labeled with: name, status_code',
    labelNames: ['name', 'status_code'],
    percentiles: [0.5, 0.9, 0.99],
    maxAgeSeconds: 300,
    ageBuckets: 5,
  })
}

export const startApiRequestSummary = (name: string) => {
  return getApiRequestSummary().startTimer({ name })
}
