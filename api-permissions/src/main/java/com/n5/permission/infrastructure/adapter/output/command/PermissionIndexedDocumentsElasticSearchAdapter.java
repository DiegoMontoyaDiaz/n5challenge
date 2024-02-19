package com.n5.permission.infrastructure.adapter.output.command;

/*import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.core.CreateRequest;
import co.elastic.clients.json.jackson.JacksonJsonpMapper;
import co.elastic.clients.transport.ElasticsearchTransport;
import co.elastic.clients.transport.rest_client.RestClientTransport;
import org.elasticsearch.client.RestClient;
import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.core.IndexResponse;
import co.elastic.clients.json.jackson.JacksonJsonpMapper;
import co.elastic.clients.transport.ElasticsearchTransport;
import co.elastic.clients.transport.rest_client.RestClientTransport;
import org.elasticsearch.client.RestClient; */

import com.fasterxml.jackson.databind.ObjectMapper;
import com.n5.permission.application.port.output.command.PermissionIndexedDocumentsCommand;
import com.n5.permission.domain.model.document.PermissionDocument;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.conn.ssl.NoopHostnameVerifier;
import org.apache.http.conn.ssl.TrustSelfSignedStrategy;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.ssl.SSLContextBuilder;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

@Repository
@Primary
public class PermissionIndexedDocumentsElasticSearchAdapter implements PermissionIndexedDocumentsCommand {

    @Value("${elastic.url}")
    private String url;

    @Value("${elastic.auth}")
    private String auth;

    @Override
    public void save(PermissionDocument permissionDocument) throws Exception {

        String requestBody = convertObjectToJson(permissionDocument);

        CloseableHttpClient httpClient = HttpClients.custom()
                .setSSLContext(SSLContextBuilder.create().loadTrustMaterial(new TrustSelfSignedStrategy()).build())
                .setSSLHostnameVerifier(NoopHostnameVerifier.INSTANCE)
                .build();
        HttpPost request = new HttpPost(url);
        request.setHeader("Content-Type", "application/json");
        request.setHeader("Authorization", auth);
        request.setEntity(new StringEntity(requestBody));

        CloseableHttpResponse response = httpClient.execute(request);
        String responseBody = EntityUtils.toString(response.getEntity());
        System.out.println("Response Code: " + response.getStatusLine().getStatusCode());
        System.out.println("Response Body: " + responseBody);
    }

    private static String convertObjectToJson(Object object) throws Exception {
        // Utilizar Jackson para convertir el objeto a JSON
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(object);
    }
}
