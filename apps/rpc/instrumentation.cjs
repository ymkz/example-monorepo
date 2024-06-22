const { DiagConsoleLogger, DiagLogLevel, diag } = require('@opentelemetry/api')
const { ConnectInstrumentation } = require('@opentelemetry/instrumentation-connect')
const { FastifyInstrumentation } = require('@opentelemetry/instrumentation-fastify')
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http')
const { ConsoleMetricExporter, PeriodicExportingMetricReader } = require('@opentelemetry/sdk-metrics')
const { NodeSDK } = require('@opentelemetry/sdk-node')
const { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-node')

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO)

const sdk = new NodeSDK({
	traceExporter: new ConsoleSpanExporter(),
	metricReader: new PeriodicExportingMetricReader({
		exporter: new ConsoleMetricExporter(),
	}),
	instrumentations: [new HttpInstrumentation(), new FastifyInstrumentation(), new ConnectInstrumentation()],
})

sdk.start()
