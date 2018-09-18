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


package io.woleet.idserver.api.model;

import java.util.Objects;
import java.util.Arrays;
import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.annotations.SerializedName;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import io.woleet.idserver.api.model.ServerEventTypeEnum;
import java.io.IOException;
import java.util.UUID;

/**
 * ServerEventBase
 */

public class ServerEventBase {
  public static final String SERIALIZED_NAME_TYPE = "type";
  @SerializedName(SERIALIZED_NAME_TYPE)
  private ServerEventTypeEnum type = null;

  public static final String SERIALIZED_NAME_OCCURRED_AT = "occurredAt";
  @SerializedName(SERIALIZED_NAME_OCCURRED_AT)
  private Long occurredAt = null;

  public static final String SERIALIZED_NAME_AUTHORIZED_USER_ID = "authorizedUserId";
  @SerializedName(SERIALIZED_NAME_AUTHORIZED_USER_ID)
  private UUID authorizedUserId = null;

  public static final String SERIALIZED_NAME_AUTHORIZED_TOKEN_ID = "authorizedTokenId";
  @SerializedName(SERIALIZED_NAME_AUTHORIZED_TOKEN_ID)
  private UUID authorizedTokenId = null;

  public static final String SERIALIZED_NAME_ASSOCIATED_TOKEN_ID = "associatedTokenId";
  @SerializedName(SERIALIZED_NAME_ASSOCIATED_TOKEN_ID)
  private UUID associatedTokenId = null;

  public static final String SERIALIZED_NAME_ASSOCIATED_USER_ID = "associatedUserId";
  @SerializedName(SERIALIZED_NAME_ASSOCIATED_USER_ID)
  private UUID associatedUserId = null;

  public static final String SERIALIZED_NAME_ASSOCIATED_KEY_ID = "associatedKeyId";
  @SerializedName(SERIALIZED_NAME_ASSOCIATED_KEY_ID)
  private UUID associatedKeyId = null;

  public ServerEventBase type(ServerEventTypeEnum type) {
    this.type = type;
    return this;
  }

   /**
   * Get type
   * @return type
  **/
  @ApiModelProperty(value = "")
  public ServerEventTypeEnum getType() {
    return type;
  }

  public void setType(ServerEventTypeEnum type) {
    this.type = type;
  }

   /**
   * Date on which an event occurred (Unix ms timestamp).
   * @return occurredAt
  **/
  @ApiModelProperty(example = "1529052551419", value = "Date on which an event occurred (Unix ms timestamp).")
  public Long getOccurredAt() {
    return occurredAt;
  }

  public ServerEventBase authorizedUserId(UUID authorizedUserId) {
    this.authorizedUserId = authorizedUserId;
    return this;
  }

   /**
   * Identifier of the user that triggered the event.
   * @return authorizedUserId
  **/
  @ApiModelProperty(example = "2b5ced14-01c5-419d-a0ae-aa9622918ca6", value = "Identifier of the user that triggered the event.")
  public UUID getAuthorizedUserId() {
    return authorizedUserId;
  }

  public void setAuthorizedUserId(UUID authorizedUserId) {
    this.authorizedUserId = authorizedUserId;
  }

  public ServerEventBase authorizedTokenId(UUID authorizedTokenId) {
    this.authorizedTokenId = authorizedTokenId;
    return this;
  }

   /**
   * Identifier of the API token used to authentify.
   * @return authorizedTokenId
  **/
  @ApiModelProperty(example = "fd7cb389-91e6-41ba-a0a5-14a05bd2b5f7", value = "Identifier of the API token used to authentify.")
  public UUID getAuthorizedTokenId() {
    return authorizedTokenId;
  }

  public void setAuthorizedTokenId(UUID authorizedTokenId) {
    this.authorizedTokenId = authorizedTokenId;
  }

  public ServerEventBase associatedTokenId(UUID associatedTokenId) {
    this.associatedTokenId = associatedTokenId;
    return this;
  }

   /**
   * Identifier of the related API token.
   * @return associatedTokenId
  **/
  @ApiModelProperty(example = "e2611d40-166f-4d7e-9fc5-164972878646", value = "Identifier of the related API token.")
  public UUID getAssociatedTokenId() {
    return associatedTokenId;
  }

  public void setAssociatedTokenId(UUID associatedTokenId) {
    this.associatedTokenId = associatedTokenId;
  }

  public ServerEventBase associatedUserId(UUID associatedUserId) {
    this.associatedUserId = associatedUserId;
    return this;
  }

   /**
   * Identifier of the related user.
   * @return associatedUserId
  **/
  @ApiModelProperty(example = "a84996d3-9a77-4e8c-947f-f00c4d64a167", value = "Identifier of the related user.")
  public UUID getAssociatedUserId() {
    return associatedUserId;
  }

  public void setAssociatedUserId(UUID associatedUserId) {
    this.associatedUserId = associatedUserId;
  }

  public ServerEventBase associatedKeyId(UUID associatedKeyId) {
    this.associatedKeyId = associatedKeyId;
    return this;
  }

   /**
   * Identifier of the related key.
   * @return associatedKeyId
  **/
  @ApiModelProperty(example = "461816ca-5623-4417-a2d1-5ee960f0a7a9", value = "Identifier of the related key.")
  public UUID getAssociatedKeyId() {
    return associatedKeyId;
  }

  public void setAssociatedKeyId(UUID associatedKeyId) {
    this.associatedKeyId = associatedKeyId;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ServerEventBase serverEventBase = (ServerEventBase) o;
    return Objects.equals(this.type, serverEventBase.type) &&
        Objects.equals(this.occurredAt, serverEventBase.occurredAt) &&
        Objects.equals(this.authorizedUserId, serverEventBase.authorizedUserId) &&
        Objects.equals(this.authorizedTokenId, serverEventBase.authorizedTokenId) &&
        Objects.equals(this.associatedTokenId, serverEventBase.associatedTokenId) &&
        Objects.equals(this.associatedUserId, serverEventBase.associatedUserId) &&
        Objects.equals(this.associatedKeyId, serverEventBase.associatedKeyId);
  }

  @Override
  public int hashCode() {
    return Objects.hash(type, occurredAt, authorizedUserId, authorizedTokenId, associatedTokenId, associatedUserId, associatedKeyId);
  }


  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ServerEventBase {\n");
    
    sb.append("    type: ").append(toIndentedString(type)).append("\n");
    sb.append("    occurredAt: ").append(toIndentedString(occurredAt)).append("\n");
    sb.append("    authorizedUserId: ").append(toIndentedString(authorizedUserId)).append("\n");
    sb.append("    authorizedTokenId: ").append(toIndentedString(authorizedTokenId)).append("\n");
    sb.append("    associatedTokenId: ").append(toIndentedString(associatedTokenId)).append("\n");
    sb.append("    associatedUserId: ").append(toIndentedString(associatedUserId)).append("\n");
    sb.append("    associatedKeyId: ").append(toIndentedString(associatedKeyId)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(java.lang.Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }

}

