package org.camelcookbook.structuringroutes.javaapp;

import org.apache.camel.CamelContext;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.component.log.LogComponent;
import org.apache.camel.impl.DefaultCamelContext;
import org.apache.camel.impl.SimpleRegistry;

/**
 * Example that demonstrates how to run the Camel runtime in a standalone Java application.
 */
public class SimpleCamelApplication {

    private static class LogMessageOnTimerEventRouteBuilder extends RouteBuilder {
        @Override
        public void configure() throws Exception {
            from("timer:logMessageTimer?period=1s")
                .to("mylogger:insideTheRoute?showHeaders=true")
                .log("Event triggered by ${property.CamelTimerName} at ${header.CamelTimerFiredTime}");
        }
    };

    public static void main(String[] args) throws Exception {
        SimpleRegistry registry = new SimpleRegistry();
        registry.put("mylogger", new LogComponent());

        CamelContext context = new DefaultCamelContext(registry);
        context.addRoutes(new LogMessageOnTimerEventRouteBuilder());
        context.start();

        // let the Camel runtime do its job for 5 seconds
        Thread.sleep(5000);

        // shutdown                                          s
        context.stop();
    }

}