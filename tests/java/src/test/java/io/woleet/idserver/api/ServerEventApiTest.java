/*
 * Woleet.ID Server
 * This is Woleet.ID Server API documentation.
 *
 * OpenAPI spec version: 1.0.0
 * Contact: contact@woleet.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


package io.woleet.idserver.api;

import io.woleet.idserver.ApiException;
import io.woleet.idserver.api.model.APIError;
import io.woleet.idserver.api.model.ServerEventArray;
import io.woleet.idserver.api.model.ServerEventGet;
import java.util.UUID;
import org.junit.Test;
import org.junit.Ignore;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * API tests for ServerEventApi
 */
@Ignore
public class ServerEventApiTest {

    private final ServerEventApi api = new ServerEventApi();

    
    /**
     * Get a server event by its identifier.
     *
     * 
     *
     * @throws ApiException
     *          if the Api call fails
     */
    @Test
    public void getServerEventByIdTest() throws ApiException {
        UUID serverEventId = null;
        ServerEventGet response = api.getServerEventById(serverEventId);

        // TODO: test validations
    }
    
    /**
     * List all Server Events.
     *
     * 
     *
     * @throws ApiException
     *          if the Api call fails
     */
    @Test
    public void getServerEventListTest() throws ApiException {
        Boolean full = null;
        ServerEventArray response = api.getServerEventList(full);

        // TODO: test validations
    }
    
}
