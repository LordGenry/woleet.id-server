
# KeyGet

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | [**UUID**](UUID.md) | Key identifier (allocated by the platform). |  [optional]
**pubKey** | **String** | Public key (bitcoin address when using BIP39 keys). |  [optional]
**type** | [**KeyTypeEnum**](KeyTypeEnum.md) |  |  [optional]
**createdAt** | **Long** | Date of creation (Unix ms timestamp). |  [optional]
**updatedAt** | **Long** | Date of last modification (Unix ms timestamp). |  [optional]
**deletedAt** | **Long** | Date of deletion (Unix ms timestamp) (&#x60;null&#x60; if not deleted). |  [optional]
**lastUsed** | **Long** | Date of last usage (Unix ms timestamp). |  [optional]



