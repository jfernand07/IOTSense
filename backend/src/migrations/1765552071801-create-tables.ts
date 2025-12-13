import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1765552071801 implements MigrationInterface {
  name = 'CreateTables1765552071801';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "plant_type" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" text, "optimal_temp_min" numeric(5,2), "optimal_temp_max" numeric(5,2), "optimal_air_humidity_min" numeric(5,2), "optimal_air_humidity_max" numeric(5,2), "optimal_soil_moisture_min" numeric(5,2), "optimal_soil_moisture_max" numeric(5,2), "optimal_light_min" numeric(10,2), "optimal_light_max" numeric(10,2), "optimal_co2_min" numeric(10,2), "optimal_co2_max" numeric(10,2), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_420372eb731f94a31b8f57de1a4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_b3be718a6b3133e96ea577cede" ON "plant_type" ("name") `);
    await queryRunner.query(
      `CREATE TABLE "plant" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "location" character varying(255), "date_planted" date, "is_active" boolean NOT NULL DEFAULT true, "notes" text, "image_url" text, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "plant_type_id" integer, "owner_user_id" integer, CONSTRAINT "PK_97e1eb0d045aadea59401ece5ba" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'user')`);
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "email" character varying(255) NOT NULL, "password_hash" text NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'user', "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
    await queryRunner.query(`CREATE TYPE "public"."device_status_enum" AS ENUM('ONLINE', 'OFFLINE', 'ERROR')`);
    await queryRunner.query(
      `CREATE TABLE "device" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "external_id" character varying(100) NOT NULL, "description" text, "status" "public"."device_status_enum" NOT NULL DEFAULT 'OFFLINE', "location" character varying(255), "last_seen_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_2dc10972aa4e27c01378dad2c72" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_aa8c06caddd73f61c70525de5b" ON "device" ("external_id") `);
    await queryRunner.query(
      `CREATE TABLE "sensor_type" ("id" SERIAL NOT NULL, "code" character varying(50) NOT NULL, "display_name" character varying(100) NOT NULL, "unit" character varying(20) NOT NULL, "description" text, CONSTRAINT "PK_176ee82c7c5a7b5bba6837ba9f6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_1a5d634e55c0fe14faf77a6fa4" ON "sensor_type" ("code") `);
    await queryRunner.query(
      `CREATE TABLE "sensor" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "external_id" character varying(100) NOT NULL, "pin" character varying(10), "calibration_offset" numeric(6,3) NOT NULL DEFAULT '0', "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "device_id" integer, "sensor_type_id" integer, "plant_id" integer, CONSTRAINT "PK_ccc38b9aa8b3e198b6503d5eee9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_bdd9c88c891413a9d114003a17" ON "sensor" ("external_id") `);
    await queryRunner.query(`CREATE TYPE "public"."alert_severity_enum" AS ENUM('INFO', 'WARNING', 'CRITICAL')`);
    await queryRunner.query(`CREATE TYPE "public"."alert_status_enum" AS ENUM('OPEN', 'ACKNOWLEDGED', 'RESOLVED')`);
    await queryRunner.query(
      `CREATE TABLE "alert" ("id" SERIAL NOT NULL, "type" character varying(50) NOT NULL, "severity" "public"."alert_severity_enum" NOT NULL, "message" text NOT NULL, "status" "public"."alert_status_enum" NOT NULL DEFAULT 'OPEN', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "resolved_at" TIMESTAMP WITH TIME ZONE, "plant_id" integer, "sensor_id" integer, "resolved_by_user_id" integer, CONSTRAINT "PK_ad91cad659a3536465d564a4b2f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."recommendation_status_enum" AS ENUM('PENDING', 'APPLIED', 'DISMISSED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "recommendation" ("id" SERIAL NOT NULL, "type" character varying(50) NOT NULL, "message" text NOT NULL, "status" "public"."recommendation_status_enum" NOT NULL DEFAULT 'PENDING', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "executed_at" TIMESTAMP WITH TIME ZONE, "plant_id" integer, "alert_id" integer, "executed_by_user_id" integer, CONSTRAINT "PK_17cb51984a6627ef2ce7370e23c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE TYPE "public"."reading_quality_flag_enum" AS ENUM('OK', 'SUSPECT', 'ERROR')`);
    await queryRunner.query(
      `CREATE TABLE "reading" ("id" BIGSERIAL NOT NULL, "value" numeric(10,3) NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "quality_flag" "public"."reading_quality_flag_enum" NOT NULL DEFAULT 'OK', "raw_payload" jsonb, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "sensor_id" integer, CONSTRAINT "PK_f46a902bd4c9624c8b512174944" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_b64297c08733448f3d403a3af4" ON "reading" ("timestamp") `);
    await queryRunner.query(
      `ALTER TABLE "plant" ADD CONSTRAINT "FK_4ae1dcd34644963f588e3e2f653" FOREIGN KEY ("plant_type_id") REFERENCES "plant_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "plant" ADD CONSTRAINT "FK_fbdfb179bb493e04dafdb1943ea" FOREIGN KEY ("owner_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "sensor" ADD CONSTRAINT "FK_494d5193129326848128d786cdb" FOREIGN KEY ("device_id") REFERENCES "device"("id") ON DELETE RESTRICT ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "sensor" ADD CONSTRAINT "FK_61270f2b0e52f614a00b00129e6" FOREIGN KEY ("sensor_type_id") REFERENCES "sensor_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "sensor" ADD CONSTRAINT "FK_9c5ecd015e602927878cb4064de" FOREIGN KEY ("plant_id") REFERENCES "plant"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "alert" ADD CONSTRAINT "FK_f78901c4024b2b8384c2ddaec26" FOREIGN KEY ("plant_id") REFERENCES "plant"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "alert" ADD CONSTRAINT "FK_8f85209f12182c382533ef967f4" FOREIGN KEY ("sensor_id") REFERENCES "sensor"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "alert" ADD CONSTRAINT "FK_517f02997153f81226bba301217" FOREIGN KEY ("resolved_by_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommendation" ADD CONSTRAINT "FK_796366292c212465635ab803023" FOREIGN KEY ("plant_id") REFERENCES "plant"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommendation" ADD CONSTRAINT "FK_31c1ed46ee4101a9fc4b1396c7a" FOREIGN KEY ("alert_id") REFERENCES "alert"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommendation" ADD CONSTRAINT "FK_05dd7db8cc8c1a0440050820af5" FOREIGN KEY ("executed_by_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "reading" ADD CONSTRAINT "FK_95aa4603a76eb9d2e448e911247" FOREIGN KEY ("sensor_id") REFERENCES "sensor"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "reading" DROP CONSTRAINT "FK_95aa4603a76eb9d2e448e911247"`);
    await queryRunner.query(`ALTER TABLE "recommendation" DROP CONSTRAINT "FK_05dd7db8cc8c1a0440050820af5"`);
    await queryRunner.query(`ALTER TABLE "recommendation" DROP CONSTRAINT "FK_31c1ed46ee4101a9fc4b1396c7a"`);
    await queryRunner.query(`ALTER TABLE "recommendation" DROP CONSTRAINT "FK_796366292c212465635ab803023"`);
    await queryRunner.query(`ALTER TABLE "alert" DROP CONSTRAINT "FK_517f02997153f81226bba301217"`);
    await queryRunner.query(`ALTER TABLE "alert" DROP CONSTRAINT "FK_8f85209f12182c382533ef967f4"`);
    await queryRunner.query(`ALTER TABLE "alert" DROP CONSTRAINT "FK_f78901c4024b2b8384c2ddaec26"`);
    await queryRunner.query(`ALTER TABLE "sensor" DROP CONSTRAINT "FK_9c5ecd015e602927878cb4064de"`);
    await queryRunner.query(`ALTER TABLE "sensor" DROP CONSTRAINT "FK_61270f2b0e52f614a00b00129e6"`);
    await queryRunner.query(`ALTER TABLE "sensor" DROP CONSTRAINT "FK_494d5193129326848128d786cdb"`);
    await queryRunner.query(`ALTER TABLE "plant" DROP CONSTRAINT "FK_fbdfb179bb493e04dafdb1943ea"`);
    await queryRunner.query(`ALTER TABLE "plant" DROP CONSTRAINT "FK_4ae1dcd34644963f588e3e2f653"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_b64297c08733448f3d403a3af4"`);
    await queryRunner.query(`DROP TABLE "reading"`);
    await queryRunner.query(`DROP TYPE "public"."reading_quality_flag_enum"`);
    await queryRunner.query(`DROP TABLE "recommendation"`);
    await queryRunner.query(`DROP TYPE "public"."recommendation_status_enum"`);
    await queryRunner.query(`DROP TABLE "alert"`);
    await queryRunner.query(`DROP TYPE "public"."alert_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."alert_severity_enum"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_bdd9c88c891413a9d114003a17"`);
    await queryRunner.query(`DROP TABLE "sensor"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_1a5d634e55c0fe14faf77a6fa4"`);
    await queryRunner.query(`DROP TABLE "sensor_type"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_aa8c06caddd73f61c70525de5b"`);
    await queryRunner.query(`DROP TABLE "device"`);
    await queryRunner.query(`DROP TYPE "public"."device_status_enum"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    await queryRunner.query(`DROP TABLE "plant"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_b3be718a6b3133e96ea577cede"`);
    await queryRunner.query(`DROP TABLE "plant_type"`);
  }
}
