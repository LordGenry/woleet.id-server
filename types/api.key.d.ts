/* Key */

type KeyTypeEnum = 'bip39';
type KeyStatusEnum = 'active' | 'blocked';

interface KeyObject { }

interface ApiKeyObject extends KeyObject, ApiCommonProperties, ApiParanoidProperties {

  /** Key name */
  name: string;

  /** Base58 encoded public key */
  pubKey: string;

  type: KeyTypeEnum;

  /** Unix timestamp (ms) */
  lastUsed: number;

  status: KeyStatusEnum;
}

interface ApiPostKeyObject extends KeyObject {
  name: string;
  type?: KeyTypeEnum;
  status?: KeyStatusEnum;
}

interface ApiPutKeyObject extends KeyObject {
  name?: string,
  status?: KeyStatusEnum
}
