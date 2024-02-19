package com.n5.permission.infrastructure.config;


public class ElasticSearchConfiguration /*extends ElasticsearchConfiguration*/ {
    /*@Override
    public ClientConfiguration clientConfiguration() {
        ClientConfiguration clientConfiguration = ClientConfiguration.builder()
                .connectedTo("localhost:9200", "localhost:9291")
                .usingSsl()
                .withConnectTimeout(Duration.ofSeconds(5))
                .withSocketTimeout(Duration.ofSeconds(3))
                .withBasicAuth("elastic", "changeme")
                //.withHeaders(() -> {
                //    HttpHeaders headers = new HttpHeaders();
                //    headers.add("currentTime", LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
                //    return headers;
                //})
                //.withClientConfigurer(
                //        ElasticsearchClientConfigurationCallback.from(clientBuilder -> {
                //            return clientBuilder;
                //        }))

        .build();
        return clientConfiguration;
    }*/
}
